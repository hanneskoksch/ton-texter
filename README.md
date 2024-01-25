# Ton-Texter

Ton-Texter is a Next.js application that allows users to upload audio files and receive transcripts in the formats DOCX, SRT, and TXT. This tool is designed to simplify the process of converting audio content into text, making it easier to work with transcriptions.

## Participants

| Name            | Abbreviation |
| --------------- | ------------ |
| Hannes Koksch   | hk058        |
| Nikolas Schaber | ns144        |
| Torben Ziegler  | tz023        |

## Getting Started

Visit the live development of [Ton-Texter](https://ton-texter.de/), or:

Follow these steps to set up Ton-Texter locally:

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/hanneskoksch/ton-texter.git
   cd ton-texter
   ```

2. **Install Dependencies**:

   ```bash
   pnpm install
   ```

3. **Populate the .env file**:

   ```bash
   cp .env.template .env
   ```

   Integrate your credentials in the .env file

4. **Start the Development Server**:

   ```bash
   npm run dev
   ```

5. Open your browser and visit [http://localhost:3000](http://localhost:3000) to use Ton-Texter.

## Usage

1. Visit the Ton-Texter application in your browser.

2. Create an account with invitation key "cct2024".

3. Go to "Dashboard".

4. Click on the "Datei hochladen" button to select and upload your audio file.

5. Wait for the transcription process to complete.

6. Download your transcriptions in DOCX, SRT, and TXT formats.

## Related repositories

- [Cloud-Transcription-Service](https://github.com/ns144/Cloud-Transcription-Service)
- [Transcription-Application](https://github.com/ns144/Transcription-Application)
