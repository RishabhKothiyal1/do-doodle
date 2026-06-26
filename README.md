# 🎨 Do Doodle

Do Doodle is a premium, serverless peer-to-peer (P2P) drawing and guessing multiplayer game. Built entirely with library-free frontend code, it runs directly in the browser with zero backend requirements or centralized databases.

## 📡 Serverless & Privacy-First Architecture

Do Doodle is engineered with a serverless, zero-data-retention philosophy:
- **Direct P2P Sync**: Game states, timer synchronizations, chat logs, and canvas vectors are broadcasted directly between peer browsers using **WebRTC Data Channels** (orchestrated via PeerJS signaling).
- **Zero Logging**: There are no central databases or user accounts. Player nicknames and avatars reside purely in browser memory during sessions and are fully purged upon tab closure.
- **Privacy-First**: No telemetry, analytics, cookies, or tracking pixels are ever utilized.

## 🎮 Features & Highlights

- **Esports Bento Layout**: A gorgeous dark mode grid dashboard styled with custom violet overlays, glassmorphic panels, and neon highlights.
- **WebGL 2 Prismatic Background**: An interactive fullscreen WebGL ray-marching background shader reacting to pointer hover interactions.
- **Micro-Animations**: Magic-style typing animations, staggered blur-in headings, and custom font pairings (`Russo One`, `Chakra Petch`, and `JetBrains Mono`).
- **Spoiler-Safe Chat System**: An open chat feed that warns of spoilers or blocks the secret word if typed by other players/drawer, while allowing general chatting to remain uninterrupted.
- **Web Audio Synth**: Dynamic sound effects (victory chords, clock ticks, chime alerts) generated procedurally on-device via the Web Audio API.
- **Flood Fill (Paint Bucket)**: A high-performance queue-based flood-fill paint algorithm with strict leakage boundaries, fully integrated into WebRTC action histories.

## 🚀 How to Run Locally

You can launch and test the game locally in two ways:

### Option A: Double-Click (Easiest)
Simply open `index.html` in any modern web browser.

### Option B: Local HTTP Server (Recommended)
To test multiplayer setups with multiple local tabs, run a simple HTTP server to avoid sandbox restrictions.

Run this command in the project directory:
```bash
python -m http.server 8000
```
Then open: [http://localhost:8000](http://localhost:8000)

## 🕹️ How to Play

1. **Open two tabs**: Launch two browser tabs of the game (e.g. side-by-side or using a private window).
2. **Host a Game (Player 1)**:
   - Enter your nickname and customize your procedural SVG avatar.
   - Select **Create a Game** and click **Create Lobby**.
   - Copy the 6-digit **Invite Code** from the share panel.
3. **Join a Game (Player 2)**:
   - In the second tab, select **Join a Game**.
   - Paste the code in the **Room Code** box and click **Join Lobby**.
4. **Start & Play**:
   - The host clicks **Start Game**.
   - Swapping turns, drawers choose from 3 words and draw on the canvas using pencils, erasers, and paint buckets.
   - Guessers type the correct word in the feed to gain points and trigger confetti celebrations!

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
