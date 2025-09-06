export type Platform = 'linkedin' | 'twitter' | 'email' | 'whatsapp' | 'instagram';

interface FormattedContent {
  text: string;
  charCount: number;
  maxChars?: number;
  hashtags?: string[];
  tweetsArray?: string[];
}

const hashtagSuggestions = {
  linkedin: ['#leadership', '#innovation', '#growth', '#business', '#networking', '#success'],
  instagram: ['#inspiration', '#motivation', '#lifestyle', '#creative', '#instagood', '#photooftheday']
};

function splitIntoSentences(text: string): string[] {
  return text.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0);
}

function formatLinkedIn(text: string): FormattedContent {
  if (!text.trim()) return { text: '', charCount: 0, maxChars: 3000 };

  const sentences = splitIntoSentences(text);
  const formattedParagraphs: string[] = [];
  let currentParagraph = '';
  let sentenceCount = 0;

  for (const sentence of sentences) {
    const trimmedSentence = sentence.trim();
    if (!trimmedSentence) continue;

    currentParagraph += (currentParagraph ? '. ' : '') + trimmedSentence;
    sentenceCount++;

    if (sentenceCount === 2) {
      formattedParagraphs.push(currentParagraph + '.');
      currentParagraph = '';
      sentenceCount = 0;
    }
  }

  // Add any remaining sentence
  if (currentParagraph) {
    formattedParagraphs.push(currentParagraph + '.');
  }

  const formattedText = formattedParagraphs.join('\n\n');
  const truncated = formattedText.length > 3000 ? formattedText.substring(0, 2997) + '...' : formattedText;

  return {
    text: truncated,
    charCount: truncated.length,
    maxChars: 3000,
    hashtags: hashtagSuggestions.linkedin.slice(0, 3)
  };
}

function formatTwitter(text: string): FormattedContent {
  if (!text.trim()) return { text: '', charCount: 0, maxChars: 280 };

  const words = text.trim().split(/\s+/);
  const tweets: string[] = [];
  let currentTweet = '';

  for (const word of words) {
    const testTweet = currentTweet + (currentTweet ? ' ' : '') + word;
    
    if (testTweet.length <= 270) { // Leave room for thread numbers
      currentTweet = testTweet;
    } else {
      if (currentTweet) {
        tweets.push(currentTweet);
        currentTweet = word;
      } else {
        // Single word is too long, truncate it
        tweets.push(word.substring(0, 270) + '...');
        currentTweet = '';
      }
    }
  }

  if (currentTweet) {
    tweets.push(currentTweet);
  }

  // Add thread numbers if more than one tweet
  const numberedTweets = tweets.length > 1 
    ? tweets.map((tweet, index) => `${index + 1}/${tweets.length}\n\n${tweet}`)
    : tweets;

  const finalText = numberedTweets.join('\n\n---\n\n');

  return {
    text: finalText,
    charCount: finalText.length,
    maxChars: tweets.length * 280,
    tweetsArray: numberedTweets
  };
}

function formatEmail(text: string): FormattedContent {
  if (!text.trim()) return { text: '', charCount: 0 };

  const paragraphs = text.split('\n').filter(p => p.trim().length > 0);
  const formattedParagraphs = paragraphs.map(p => p.trim());

  const emailText = `Dear [Name],

${formattedParagraphs.join('\n\n')}

Best regards,
[Your Name]`;

  return {
    text: emailText,
    charCount: emailText.length
  };
}

function formatWhatsApp(text: string): FormattedContent {
  if (!text.trim()) return { text: '', charCount: 0 };

  // Remove extra formatting and split into words
  const cleanText = text.replace(/[*_~`]/g, '');
  const words = cleanText.split(/\s+/);
  const lines: string[] = [];
  let currentLine = '';

  for (const word of words) {
    const testLine = currentLine + (currentLine ? ' ' : '') + word;
    
    if (testLine.length <= 65) {
      currentLine = testLine;
    } else {
      if (currentLine) {
        lines.push(currentLine);
        currentLine = word;
      } else {
        // Single word is too long, keep it as is
        lines.push(word);
        currentLine = '';
      }
    }
  }

  if (currentLine) {
    lines.push(currentLine);
  }

  // Add extra spacing for mobile readability
  const formattedText = lines.join('\n\n');

  return {
    text: formattedText,
    charCount: formattedText.length
  };
}

function formatInstagram(text: string): FormattedContent {
  if (!text.trim()) return { text: '', charCount: 0 };

  const firstPart = text.substring(0, 125);
  const remainingText = text.substring(125);

  let formattedText = firstPart;

  if (remainingText) {
    const remainingLines = remainingText.split('\n').filter(line => line.trim());
    const formattedRemaining = remainingLines.map(line => line.trim()).join('\n\n');
    formattedText += '\n\n' + formattedRemaining;
  }

  return {
    text: formattedText,
    charCount: formattedText.length,
    hashtags: hashtagSuggestions.instagram.slice(0, 30)
  };
}

export function formatForPlatform(text: string, platform: Platform): FormattedContent {
  switch (platform) {
    case 'linkedin':
      return formatLinkedIn(text);
    case 'twitter':
      return formatTwitter(text);
    case 'email':
      return formatEmail(text);
    case 'whatsapp':
      return formatWhatsApp(text);
    case 'instagram':
      return formatInstagram(text);
    default:
      return { text, charCount: text.length };
  }
}