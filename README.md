# Ton-Texter

Ton-Texter is a Next.js application that allows users to upload audio files and receive transcripts in DOCX, SRT, and TXT formats. This tool is designed to simplify the process of converting audio content to text, making it easier to work with transcriptions, especially in the context of video media, where a text-based video editing workflow (e.g. of interviews) can save valuable time. 

Relevant technologies include: Next.js, TypeScript, Prisma, tRPC, TailwindCSS, HeroUI, Supabase (auth & database), Vercel, S3

The following figure gives an overview of our entire architecture. This respository is used to setup Next.JS:

![SystemEngineering_NextJS](https://github.com/user-attachments/assets/2acc70a3-30a9-4da7-a447-f0294c9271d0)

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

| Service                                                      | Description                                                  | Scope                 |
| ------------------------------------------------------------ | ------------------------------------------------------------ | --------------------- |
| [Cloud-Transcription-Service](https://github.com/ns144/Cloud-Transcription-Service) | AWS cloud infrastructure via Terraform and Lambdas.          | Transcription Service |
| [Transcription-Application](https://github.com/ns144/Transcription-Application) | The python application that does the transcription and the speaker diarization. | Transcription Service |
| [Cloud-Transcription-Machine](https://github.com/ns144/Cloud-Transcription-Machine) | The EC2 machine setup.                                       | Transcription Service |
| [Ton-Texter-JMeter-Tests](https://github.com/hanneskoksch/Ton-Texter-JMeter-Tests) | JMeter load and quick tests of the Ton-Texter application.   | End-to-end            |
