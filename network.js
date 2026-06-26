// ==========================================
// P2P NETWORKING LOGIC (PEERJS)
// ==========================================

const network = {
    peer: null,
    isHost: false,
    myId: "",
    hostId: "",
    
    // Host specific variables
    clients: {}, // Map of clientPeerId -> DataConnection
    players: [], // Array of player objects: { id, name, avatar, score, hasGuessed, active }
    drawHistory: [], // Master draw history for synchronization
    
    // Client specific variables
    connToHost: null,
    
    // Game variables synced from Host
    gameState: {
        state: "LOBBY", // LOBBY, SELECTING_WORD, DRAWING, ROUND_END, GAME_OVER
        round: 1,
        totalRounds: 3,
        drawTime: 80,
        currentDrawer: "", // peerId of drawer
        currentWord: "",
        correctGuessers: [], // list of peerIds
        wordChoices: [], // 3 words for selection
        timer: 80,
        drawerIndex: -1,
        drawnThisRound: [] // list of peerIds who have drawn in the current round
    },

    // ==========================================
    // INITIALIZATION (HOST MODE)
    // ==========================================
    initHost() {
        this.isHost = true;
        this.role = "host";
        game.showToast("Creating room...");

        const tryCreatePeer = () => {
            const randomCode = Math.floor(100000 + Math.random() * 900000);
            const hostIdStr = `dodoodle-${randomCode}`;
            
            this.peer = new Peer(hostIdStr, {
                debug: 1
            });

            this.peer.on('open', (id) => {
                this.myId = id;
                this.hostId = id;
                const displayCode = id.replace('dodoodle-', '');
                document.getElementById('share-code-display').value = displayCode;
                
                // Set initial language from setup screen selection
                const initialLang = document.getElementById('language-select').value;
                this.gameState.language = initialLang;
                document.getElementById('lobby-language-select').value = initialLang;

                // Add Host as first player
                this.players = [{
                    id: id,
                    name: game.myNickname,
                    avatar: game.myAvatar,
                    score: 0,
                    active: true
                }];
                
                // Update local UI
                game.updateLobbyPlayersList(this.players);
                game.showScreen('lobby-screen');
                game.showToast("Room created! Share the code.");
            });

            this.peer.on('connection', (conn) => {
                this.handleIncomingConnection(conn);
            });

            this.peer.on('error', (err) => {
                console.error("PeerJS Host Error:", err);
                if (err.type === 'unavailable-id') {
                    // Try again with another random ID
                    tryCreatePeer();
                } else {
                    game.showToast("Network Error: " + err.message);
                }
            });
        };

        tryCreatePeer();
    },

    // ==========================================
    // INITIALIZATION (CLIENT MODE)
    // ==========================================
    initClient(code) {
        this.isHost = false;
        this.role = "client";
        game.showToast("Connecting to room...");

        // Format room code: make sure it includes 'dodoodle-' prefix
        let targetPeerId = code.trim();
        if (!targetPeerId.startsWith('dodoodle-')) {
            targetPeerId = `dodoodle-${targetPeerId}`;
        }

        this.peer = new Peer(null, {
            debug: 1
        });

        this.peer.on('open', (id) => {
            this.myId = id;
            this.hostId = targetPeerId;

            // Connect to host
            const conn = this.peer.connect(targetPeerId, {
                reliable: true
            });
            this.connToHost = conn;
            this.setupClientConnection(conn);
        });

        this.peer.on('error', (err) => {
            console.error("PeerJS Client Error:", err);
            game.showToast("Connection failed. Check Room Code!");
        });
    },

    // ==========================================
    // HOST CONNECTION RECEIVERS
    // ==========================================
    handleIncomingConnection(conn) {
        const registerClient = () => {
            this.clients[conn.peer] = conn;
        };

        if (conn.open) {
            registerClient();
        } else {
            conn.on('open', registerClient);
        }

        conn.on('data', (data) => {
            this.handleHostDataReceived(conn.peer, data);
        });

        conn.on('close', () => {
            this.handleClientDisconnect(conn.peer);
        });

        conn.on('error', (err) => {
            console.error("Host DataConnection Error:", err);
            this.handleClientDisconnect(conn.peer);
        });
    },

    // ==========================================
    // CLIENT CONNECTION RECEIVERS
    // ==========================================
    setupClientConnection(conn) {
        conn.on('open', () => {
            // Send join information immediately
            conn.send({
                type: 'join',
                name: game.myNickname,
                avatar: game.myAvatar
            });
            game.showToast("Connected! Entering lobby...");
        });

        conn.on('data', (data) => {
            this.handleClientDataReceived(data);
        });

        conn.on('close', () => {
            game.showToast("Lost connection to host!");
            game.showScreen('setup-screen');
        });

        conn.on('error', (err) => {
            console.error("Connection error:", err);
            game.showToast("Network connection error!");
            game.showScreen('setup-screen');
        });
    },

    // ==========================================
    // HOST DATA ROUTING
    // ==========================================
    handleHostDataReceived(clientPeerId, msg) {
        if (msg.type === 'join') {
            // Check if game is in progress
            if (this.gameState.state !== 'LOBBY') {
                this.clients[clientPeerId].send({
                    type: 'error',
                    message: 'Game is already in progress!'
                });
                this.clients[clientPeerId].close();
                delete this.clients[clientPeerId];
                return;
            }

            // Limit lobby size
            if (this.players.length >= 10) {
                this.clients[clientPeerId].send({
                    type: 'error',
                    message: 'Lobby is full!'
                });
                this.clients[clientPeerId].close();
                delete this.clients[clientPeerId];
                return;
            }

            // Register client
            this.players.push({
                id: clientPeerId,
                name: msg.name,
                avatar: msg.avatar,
                score: 0,
                active: true
            });

            // Notify everyone of join
            this.broadcastSystemMessage(`${msg.name} joined the room.`);
            this.broadcastLobbyUpdate();
            sound.success();
        }

        else if (msg.type === 'chat') {
            console.log("Host received chat message from client connection:", clientPeerId, "text:", msg.text);
            const sender = this.players.find(p => p.id === clientPeerId);
            if (!sender) {
                console.warn("Sender not found in players list:", clientPeerId, "players:", this.players);
                return;
            }

            this.processMessage(clientPeerId, sender.name, msg.text);
        }

        else if (msg.type === 'draw') {
            // Validate drawer
            if (this.gameState.state === 'DRAWING' && this.gameState.currentDrawer === clientPeerId) {
                // Relay drawing operation to all other clients
                this.broadcastToAllClients({
                    type: 'draw_relayed',
                    data: msg.data
                }, [clientPeerId]);

                // Maintain Host history and draw locally on Host browser
                if (msg.data.type === 'clear') {
                    this.drawHistory = [];
                    game.clearCanvasLocal();
                } else if (msg.data.type === 'undo') {
                    game.undoLastStrokeLocal();
                } else if (msg.data.type === 'draw_segment') {
                    game.handleDrawSegment(msg.data);
                    
                    if (msg.data.tool === 'bucket') {
                        this.drawHistory.push({
                            type: 'fill',
                            x: msg.data.x0,
                            y: msg.data.y0,
                            color: msg.data.color
                        });
                    } else {
                        const lastStroke = this.drawHistory[this.drawHistory.length - 1];
                        if (lastStroke && lastStroke.type === 'stroke' && lastStroke.color === msg.data.color && lastStroke.size === msg.data.size && lastStroke.isEraser === msg.data.eraser) {
                            lastStroke.points.push({ x: msg.data.x1, y: msg.data.y1 });
                        } else {
                            this.drawHistory.push({
                                type: 'stroke',
                                points: [{ x: msg.data.x0, y: msg.data.y0 }, { x: msg.data.x1, y: msg.data.y1 }],
                                color: msg.data.color,
                                size: msg.data.size,
                                isEraser: msg.data.eraser
                            });
                        }
                    }
                }
            }
        }

        else if (msg.type === 'select_word') {
            if (this.gameState.state === 'SELECTING_WORD' && this.gameState.currentDrawer === clientPeerId) {
                this.startDrawingPhase(msg.word);
            }
        }
    },

    // ==========================================
    // CLIENT DATA ROUTING
    // ==========================================
    handleClientDataReceived(msg) {
        if (msg.type === 'lobby_update') {
            this.players = msg.players;
            if (msg.gameState) {
                this.gameState = msg.gameState;
                // Sync settings in DOM
                document.getElementById('rounds-select').value = this.gameState.totalRounds || 3;
                document.getElementById('draw-time-select').value = this.gameState.drawTime || 80;
                document.getElementById('lobby-language-select').value = this.gameState.language || "en";
            }
            game.updateLobbyPlayersList(this.players);
            
            // Set invite code on display
            const displayCode = this.hostId.replace('dodoodle-', '');
            document.getElementById('share-code-display').value = displayCode;
            game.showScreen('lobby-screen');
        }

        else if (msg.type === 'error') {
            game.showToast(msg.message);
        }

        else if (msg.type === 'state_change') {
            const oldState = this.gameState.state;
            this.gameState = msg.gameState;
            this.players = msg.players;

            // Trigger UI updates
            if (this.gameState.state === 'LOBBY') {
                game.showScreen('lobby-screen');
                game.updateLobbyPlayersList(this.players);
            } 
            
            else if (this.gameState.state === 'SELECTING_WORD') {
                game.showScreen('game-screen');
                game.clearCanvasLocal();
                game.updateScoreboard(this.players, this.gameState);
                game.renderWordState(this.gameState);

                const isMeDrawing = this.gameState.currentDrawer === this.myId;
                const drawer = this.players.find(p => p.id === this.gameState.currentDrawer);
                
                if (isMeDrawing) {
                    game.showWordSelectionOverlay(this.gameState.wordChoices);
                } else if (drawer) {
                    game.showWordSelectingOverlayForGuessers(drawer.name);
                }
            } 
            
            else if (this.gameState.state === 'DRAWING') {
                game.hideCanvasOverlay();
                game.renderWordState(this.gameState);
                game.updateScoreboard(this.players, this.gameState);

                const isMeDrawing = this.gameState.currentDrawer === this.myId;
                const toolbar = document.getElementById('drawing-toolbar');
                if (isMeDrawing) {
                    toolbar.classList.remove('disabled');
                    game.showToast("It's your turn to draw!");
                } else {
                    toolbar.classList.add('disabled');
                }
            } 
            
            else if (this.gameState.state === 'ROUND_END') {
                game.hideCanvasOverlay();
                game.updateScoreboard(this.players, this.gameState);
                
                // Show completed word
                document.getElementById('word-display').innerHTML = `<span style="color: var(--color-warning); font-family: inherit;">${this.gameState.currentWord.toUpperCase()}</span>`;
                
                game.showToast(`Round finished! Word was: ${this.gameState.currentWord}`);
            } 
            
            else if (this.gameState.state === 'GAME_OVER') {
                game.showPodium(this.players);
            }
        }

        else if (msg.type === 'draw_history') {
            game.drawHistory = msg.history;
            game.redrawCanvas();
        }

        else if (msg.type === 'draw_relayed') {
            const data = msg.data;
            if (data.type === 'clear') {
                game.clearCanvasLocal();
            } else if (data.type === 'undo') {
                game.undoLastStrokeLocal();
            } else if (data.type === 'draw_segment') {
                game.handleDrawSegment(data);
            }
        }

        else if (msg.type === 'timer') {
            game.updateTimerDisplay(msg.timeRemaining, msg.maxTime);
            
            // Adjust HUD round details
            document.getElementById('game-round-title').innerText = `Round ${this.gameState.round} of ${this.gameState.totalRounds}`;
            const drawer = this.players.find(p => p.id === this.gameState.currentDrawer);
            document.getElementById('hud-drawer-name').innerText = drawer ? drawer.name : "-";
        }

        else if (msg.type === 'chat_message') {
            console.log("Client received chat message from Host:", msg);
            game.appendChatMessage(msg.sender, msg.text, msg.style);
            if (msg.style === 'correct') {
                sound.success();
                confetti.spawn(30);
            }
        }
    },

    // ==========================================
    // DISCONNECTS HANDLERS
    // ==========================================
    handleClientDisconnect(clientPeerId) {
        const pIndex = this.players.findIndex(p => p.id === clientPeerId);
        if (pIndex !== -1) {
            const pName = this.players[pIndex].name;
            this.players.splice(pIndex, 1);
            delete this.clients[clientPeerId];

            this.broadcastSystemMessage(`${pName} left the game.`);
            this.broadcastLobbyUpdate();

            // If game active, re-evaluate drawer & game state
            if (this.gameState.state !== 'LOBBY' && this.gameState.state !== 'GAME_OVER') {
                if (this.gameState.currentDrawer === clientPeerId) {
                    this.broadcastSystemMessage("The drawer disconnected. Skipping turn...");
                    this.endTurn();
                } else {
                    // Check if remaining guessers have all guessed correctly
                    this.checkGuessCompletions();
                }
            }
        }
    },

    // ==========================================
    // BROADCAST HELPERS (HOST ONLY)
    // ==========================================
    broadcastToAllClients(data, excludeIds = []) {
        Object.keys(this.clients).forEach(clientId => {
            if (!excludeIds.includes(clientId)) {
                this.clients[clientId].send(data);
            }
        });
    },

    broadcastLobbyUpdate() {
        this.broadcastToAllClients({
            type: 'lobby_update',
            players: this.players,
            gameState: this.gameState
        });
        game.updateLobbyPlayersList(this.players);
    },

    broadcastGameState() {
        this.broadcastToAllClients({
            type: 'state_change',
            gameState: this.gameState,
            players: this.players
        });
        
        // Trigger self update
        this.handleClientDataReceived({
            type: 'state_change',
            gameState: this.gameState,
            players: this.players
        });
    },

    broadcastSystemMessage(text) {
        const msg = {
            type: 'chat_message',
            sender: "System",
            text: text,
            style: 'system'
        };
        this.broadcastToAllClients(msg);
        this.handleClientDataReceived(msg);
    },

    // ==========================================
    // OUTGOING MESSAGES (CLIENT -> HOST)
    // ==========================================
    sendDrawingData(data) {
        if (this.isHost) {
            // If Host draws, broadcast to all clients immediately
            this.broadcastToAllClients({
                type: 'draw_relayed',
                data: data
            });
        } else if (this.connToHost && this.connToHost.open) {
            this.connToHost.send({
                type: 'draw',
                data: data
            });
        }
    },

    sendChatMessage(text) {
        if (this.isHost) {
            console.log("Host sending chat message locally:", text);
            this.processMessage(this.myId, game.myNickname, text);
        } else if (this.connToHost && this.connToHost.open) {
            console.log("Client sending chat message to Host:", text);
            this.connToHost.send({
                type: 'chat',
                text: text
            });
        } else {
            console.warn("Client failed to send chat message. connToHost open:", this.connToHost ? this.connToHost.open : "null");
        }
    },

    selectWord(word) {
        if (this.isHost) {
            this.startDrawingPhase(word);
        } else if (this.connToHost && this.connToHost.open) {
            this.connToHost.send({
                type: 'select_word',
                word: word
            });
        }
    },

    // ==========================================
    // CORE GAME LOGIC (HOST CENTRAL COMMAND)
    // ==========================================
    broadcastSettings() {
        // Read Settings from DOM
        this.gameState.totalRounds = parseInt(document.getElementById('rounds-select').value);
        this.gameState.drawTime = parseInt(document.getElementById('draw-time-select').value);
        this.gameState.language = document.getElementById('lobby-language-select').value;
        this.broadcastLobbyUpdate();
    },

    startGame() {
        if (this.players.length < 2) {
            game.showToast("Need at least 2 players to start!");
            return;
        }

        // Fetch settings
        this.broadcastSettings();
        
        this.gameState.round = 1;
        this.gameState.drawerIndex = -1;
        this.gameState.drawnThisRound = [];
        this.players.forEach(p => p.score = 0);
        
        sound.start();
        this.startNextTurn();
    },

    startNextTurn() {
        this.gameState.correctGuessers = [];
        this.drawHistory = [];
        this.clearDrawHistory();

        // Check if round is complete (everyone has drawn)
        let eligibleDrawers = this.players.filter(p => !this.gameState.drawnThisRound.includes(p.id));
        if (eligibleDrawers.length === 0) {
            // Next round!
            if (this.gameState.round >= this.gameState.totalRounds) {
                // Game Over!
                this.gameState.state = 'GAME_OVER';
                this.broadcastGameState();
                return;
            }
            this.gameState.round++;
            this.gameState.drawnThisRound = [];
            eligibleDrawers = this.players;
        }

        // Choose drawer
        const nextDrawer = eligibleDrawers[Math.floor(Math.random() * eligibleDrawers.length)];
        this.gameState.currentDrawer = nextDrawer.id;
        this.gameState.drawnThisRound.push(nextDrawer.id);

        this.gameState.state = 'SELECTING_WORD';

        // Select 3 random words
        this.gameState.wordChoices = this.getRandomWords(3);
        this.gameState.currentWord = "";

        this.broadcastGameState();
        
        // Start 15s Word Selection Timer
        this.startTimer(15, () => {
            // Callback if drawer fails to select: auto select first word
            const autoWord = this.gameState.wordChoices[0];
            this.startDrawingPhase(autoWord);
        });
    },

    startDrawingPhase(word) {
        this.stopTimer();
        this.gameState.state = 'DRAWING';
        this.gameState.currentWord = word.toLowerCase();
        
        this.broadcastGameState();
        this.broadcastSystemMessage("The word has been selected! Start guessing.");

        // Sync drawing canvas to blank
        this.broadcastToAllClients({
            type: 'draw_history',
            history: []
        });

        // Start drawing round timer
        this.startTimer(this.gameState.drawTime, () => {
            // Time out callback
            this.broadcastSystemMessage(`Time's up! The word was "${this.gameState.currentWord}".`);
            sound.failure();
            this.endTurn();
        });
    },

    processMessage(senderId, senderName, text) {
        console.log("Host processMessage: senderId:", senderId, "senderName:", senderName, "text:", text);
        const cleanMsg = text.trim();
        const guess = cleanMsg.toLowerCase();
        const isDrawing = this.gameState.state === 'DRAWING';
        const isDrawer = isDrawing && this.gameState.currentDrawer === senderId;
        const alreadyGuessed = isDrawing && this.gameState.correctGuessers.includes(senderId);

        const wordRegex = isDrawing ? new RegExp('\\b' + this.gameState.currentWord + '\\b', 'i') : null;
        const containsSecretWord = isDrawing && wordRegex && wordRegex.test(guess);

        if (isDrawing) {
            // If the message contains the secret word
            if (containsSecretWord) {
                // If the player hasn't guessed yet and is not the drawer
                if (!alreadyGuessed && !isDrawer) {
                    // Check if it's an exact guess (spoilers/warnings are bypassed if they actually get it right)
                    if (guess === this.gameState.currentWord) {
                        // Correct guess!
                        this.gameState.correctGuessers.push(senderId);
                        
                        const timeRemaining = this.gameState.timer;
                        const totalTime = this.gameState.drawTime;
                        const points = Math.round(100 + 400 * (timeRemaining / totalTime));
                        
                        const guesser = this.players.find(p => p.id === senderId);
                        if (guesser) guesser.score += points;

                        const drawer = this.players.find(p => p.id === this.gameState.currentDrawer);
                        if (drawer) drawer.score += 70;

                        const announcement = `${senderName} guessed the word! (+${points} pts)`;
                        const correctMsg = {
                            type: 'chat_message',
                            sender: "System",
                            text: announcement,
                            style: 'correct'
                        };
                        this.broadcastToAllClients(correctMsg);
                        this.handleClientDataReceived(correctMsg);

                        this.broadcastGameState();
                        this.checkGuessCompletions();
                        return;
                    }
                }

                // If they are drawer, or have already guessed, or it's not an exact guess (but contains the word)
                // Block the message and send a private warning
                const warningText = isDrawer 
                    ? "You are the drawer! You cannot send the secret word."
                    : "Your message contains the secret word! Chat message blocked.";
                
                const warningMsg = {
                    type: 'chat_message',
                    sender: "System",
                    text: warningText,
                    style: 'close'
                };
                if (senderId === this.myId) {
                    this.handleClientDataReceived(warningMsg);
                } else if (this.clients[senderId]) {
                    this.clients[senderId].send(warningMsg);
                }
                return;
            }

            // Close guess (Levenshtein distance check) - only for guessers who haven't guessed yet
            if (!alreadyGuessed && !isDrawer && this.isCloseWord(guess, this.gameState.currentWord)) {
                const closeMsg = {
                    type: 'chat_message',
                    sender: "System",
                    text: `"${cleanMsg}" is very close!`,
                    style: 'close'
                };
                if (senderId === this.myId) {
                    this.handleClientDataReceived(closeMsg);
                } else if (this.clients[senderId]) {
                    this.clients[senderId].send(closeMsg);
                }
                // Do not return; let the message get broadcast to everyone normally (since it's not the exact word)
            }
        }

        // All normal messages (not containing the secret word) are broadcast to everyone
        const chatMsg = {
            type: 'chat_message',
            sender: senderName,
            text: cleanMsg,
            style: 'normal'
        };

        this.broadcastToAllClients(chatMsg);
        this.handleClientDataReceived(chatMsg);
    },

    checkGuessCompletions() {
        const totalPlayers = this.players.length;
        const guesserCount = totalPlayers - 1; // total players minus drawer
        const correctCount = this.gameState.correctGuessers.length;

        if (guesserCount > 0 && correctCount >= guesserCount) {
            this.endTurn();
        }
    },

    endTurn() {
        this.stopTimer();
        this.gameState.state = 'ROUND_END';
        
        this.broadcastGameState();
        
        // Show scoreboard podium/round end layout, then queue next turn in 5s
        setTimeout(() => {
            if (this.gameState.state === 'ROUND_END') {
                this.startNextTurn();
            }
        }, 5000);
    },

    resetToLobby() {
        this.gameState.state = 'LOBBY';
        this.players.forEach(p => p.score = 0);
        this.gameState.drawnThisRound = [];
        this.broadcastGameState();
    },

    // ==========================================
    // TIMER UTILITIES
    // ==========================================
    timerInterval: null,
    startTimer(seconds, onComplete) {
        this.stopTimer();
        this.gameState.timer = seconds;
        const maxTime = seconds;

        // Immediately broadcast initial tick
        this.broadcastToAllClients({
            type: 'timer',
            timeRemaining: this.gameState.timer,
            maxTime: maxTime
        });
        this.handleClientDataReceived({
            type: 'timer',
            timeRemaining: this.gameState.timer,
            maxTime: maxTime
        });

        this.timerInterval = setInterval(() => {
            this.gameState.timer--;
            
            this.broadcastToAllClients({
                type: 'timer',
                timeRemaining: this.gameState.timer,
                maxTime: maxTime
            });
            this.handleClientDataReceived({
                type: 'timer',
                timeRemaining: this.gameState.timer,
                maxTime: maxTime
            });

            if (this.gameState.timer <= 0) {
                this.stopTimer();
                if (onComplete) onComplete();
            }
        }, 1000);
    },

    stopTimer() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
    },

    // ==========================================
    // CORE DRAWING HISTORY HELPERS
    // ==========================================
    pushDrawHistory(stroke) {
        this.drawHistory.push(stroke);
    },

    popDrawHistory() {
        this.drawHistory.pop();
    },

    clearDrawHistory() {
        this.drawHistory = [];
    },

    // ==========================================
    // VOCABULARY HELPERS
    // ==========================================
    getRandomWords(count) {
        // Read custom words if entered
        let customWords = [];
        const txtArea = document.getElementById('custom-words-input');
        if (txtArea && txtArea.value.trim()) {
            customWords = txtArea.value.split(',')
                .map(w => w.trim())
                .filter(w => w.length >= 3);
        }

        const activeLang = this.gameState.language || "en";
        const pool = customWords.length >= 3 ? customWords : (WORD_DICTIONARIES[activeLang] || WORD_DICTIONARIES['en']);
        const shuffled = [...pool].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    },

    // Levenshtein / edit distance check for close words
    isCloseWord(s1, s2) {
        if (Math.abs(s1.length - s2.length) > 1) return false;
        
        let editCount = 0;
        let i = 0, j = 0;
        
        while (i < s1.length && j < s2.length) {
            if (s1[i] !== s2[j]) {
                editCount++;
                if (editCount > 1) return false;
                
                if (s1.length > s2.length) i++;
                else if (s2.length > s1.length) j++;
                else { i++; j++; }
            } else {
                i++;
                j++;
            }
        }
        
        if (i < s1.length || j < s2.length) editCount++;
        return editCount === 1;
    }
};
