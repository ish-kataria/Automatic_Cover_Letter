import axios from 'axios';
const GEMINI_API_KEY = 'AIzaSyCSY5LWR_39ve_fqsoHGEjcCVD4gUskVrA'; // Replace with your OpenAI API key

export const generateCoverLetter = async ({
  name,
  email,
  phone,
  address,
  resumeUri,
  company,
  jobDescription,
  role,
  linkedin
}: {
  name: String;
  email: String;
  phone: String;
  address: String;
  resumeUri: String;
  company: String;
  jobDescription: String;
  role: String;
  linkedin: String;
}) => {
  const prompt = `
    Using the following inputs, generate a elegant cover letter with correct html elements such that it looks good in pdf format and in one page:
    Resume: ${resumeUri}
    Company: ${company}
    Job Description: ${jobDescription}
    Role: ${role}
    Name: ${name}
    Address: ${address}
    Phone: ${phone}
    Linkedin Url: ${linkedin}
    Email: ${email}
    Note : 1. Fetch the resume from the provided link,
     2  Use the job description to understand the role and company,
     3. Use the role to understand the job requirements and responsibilities,
     4. Use the name, address, phone, linkedin, and email provided to personalize the cover letter.
     5. Use keywords from projects and experiences in the resume to highlight relevant skills and experiences.
     6. DO NOT ADD anything that is not present in the resume.
     7. DO NOT MENTION Projects, just mention skills through keywords.
     8. Do not mention Company address and date.
     9. Do not add suggestions in the end.
     10. Do not add '''html at the top.
  `;
  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        contents: [{ "parts": [{ "text": prompt }] }],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.request._response;
  } catch (error) {

    console.error('Error generating cover letter:', error);
    throw error;
  }
};