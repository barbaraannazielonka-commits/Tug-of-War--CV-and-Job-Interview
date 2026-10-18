import { Question } from '../types/game';

export const DEFAULT_QUESTIONS: Question[] = [
  {
    id: 1,
    type: 'mc',
    category: 'CV Structure',
    question: 'In what chronological order should your education and work experience be listed on a modern CV?',
    options: [
      'Reverse chronological order (most recent achievements first)',
      'Alphabetical order by employer or institution name',
      'Random order based on personal favorites',
      'Oldest experiences first starting from early childhood'
    ],
    correct: 0, // A
    explanation: 'Employers want to immediately see what you have accomplished recently. Always place your current or latest school/job right at the top.',
    careerTip: 'Recruiters spend an average of 6-7 seconds on an initial scan. Front-load your latest achievements.'
  },
  {
    id: 2,
    type: 'mc',
    category: 'CV Writing',
    question: 'Which of the following contact details should NEVER be placed on a CV for privacy and anti-bias reasons?',
    options: [
      'Professional email address',
      'Mobile telephone number',
      'National Insurance / Social Security number & Date of Birth',
      'Town or City and Postcode area'
    ],
    correct: 2, // C
    explanation: 'Sensitive personal identifiers like National Insurance / SSN, marital status, religion, and full date of birth must stay off your CV to safeguard identity and prevent discrimination.',
    careerTip: 'Keep your header concise: Full Name, Professional Email, Mobile Number, City/County, and optionally a tailored LinkedIn profile.'
  },
  {
    id: 3,
    type: 'mc',
    category: 'STAR Method',
    question: "What does the acclaimed 'STAR' interview technique stand for when answering competency-based questions?",
    options: [
      'Strengths, Talents, Achievements, Respect',
      'Situation, Task, Action, Result',
      'Speak, Think, Act, Review',
      'Skills, Teamwork, Attitude, Reliability'
    ],
    correct: 1, // B
    explanation: "STAR (Situation, Task, Action, Result) gives your answers narrative clarity: establish context, explain the challenge, detail YOUR actions, and quantify the outcome.",
    careerTip: 'Dedicate about 60% of your answer to the Action step: explain what YOU specifically decided and did.'
  },
  {
    id: 4,
    type: 'mc',
    category: 'CV Writing',
    question: 'Which word is the strongest, most dynamic action verb to describe teamwork and initiative on a student CV?',
    options: [
      'Helped out with',
      'Did miscellaneous stuff for',
      'Spearheaded & Coordinated',
      'Tried my best to assist'
    ],
    correct: 2, // C
    explanation: "Dynamic action verbs like 'Spearheaded', 'Coordinated', 'Designed', and 'Synthesized' portray confidence, ownership, and measurable contribution.",
    careerTip: 'Start every CV bullet point with a past-tense action verb (e.g., Organized, Resolved, Facilitated, Implemented).'
  },
  {
    id: 5,
    type: 'open',
    category: 'Interview Strategy',
    question: "The interviewer asks: 'What is your greatest weakness?' What is the most effective formula for answering this honestly without disqualifying yourself?",
    rubric: 'Candidate must: 1) Identify a genuine, non-critical technical or soft skill area for growth (e.g. public speaking, over-committing, advanced Excel). 2) Describe concrete, proactive actions they are actively taking to improve (e.g. taking courses, using planner apps). 3) Avoid cliches like "I work too hard" or "I am a perfectionist".',
    explanation: "Self-awareness and coachability are what hiring managers look for. Acknowledging a real growth area paired with an active improvement plan showcases mature professionalism.",
    careerTip: 'Never disguise a positive trait as a flaw. Select a real skill, state what you learned, and highlight your progress.'
  },
  {
    id: 6,
    type: 'mc',
    category: 'CV Structure',
    question: "What is the recommended ideal page length for a high school student, apprentice, or first-time job seeker's CV?",
    options: [
      'At least 4 pages to prove you have a lot of ambition',
      'Half a page written with decorative cursive fonts',
      'Page count is completely irrelevant in modern hiring',
      '1 crisp, well-formatted page (maximum 2 pages only if having substantial relevant experience)'
    ],
    correct: 3, // D
    explanation: 'A concise 1-page CV forces you to prioritize relevant quality over fluff. Entry-level candidates rarely have enough relevant industry work to justify multiple pages.',
    careerTip: 'Use consistent 10-12pt clean fonts (Calibri, Arial, Inter, Plus Jakarta Sans) and standard 0.5-0.75 inch margins.'
  },
  {
    id: 7,
    type: 'mc',
    category: 'First Impressions',
    question: 'What is the standard professional etiquette regarding your mobile smartphone during an in-person job interview?',
    options: [
      'Leave it on the table face-up so you can check the time discreetly',
      'Keep it on vibrate in your hand so you do not miss family notifications',
      'Answer briefly if it is an urgent text message',
      'Turn it completely on silent or airplane mode and tuck it out of sight in your bag or coat'
    ],
    correct: 3, // D
    explanation: 'Having a phone visible, vibrating, or ringing suggests divided attention and disrespect for the interviewer’s time. Keep it entirely silenced and out of sight.',
    careerTip: 'Do not rely on vibrate mode—vibration against wooden conference tables creates a loud buzzing noise.'
  },
  {
    id: 8,
    type: 'mc',
    category: 'CV Writing',
    question: 'If you have never held a formal paid job before, which section should you emphasize to demonstrate transferable employability skills?',
    options: [
      'Volunteering, school clubs, sports captaincy, part-time babysitting, and class group projects',
      'Leave the experience section blank and hope they do not notice',
      'Fabricate a fictional small business you claim to have run',
      'Copy and paste your parents’ career history'
    ],
    correct: 0, // A
    explanation: 'Extracurricular roles, committee responsibilities, volunteering, and scout/cadet leadership prove reliability, communication, and problem-solving.',
    careerTip: 'Group these under a heading like "Leadership & Extracurricular Projects" or "Key Achievements".'
  },
  {
    id: 9,
    type: 'open',
    category: 'Interview Strategy',
    question: "At the end of an interview, the panel asks: 'Do you have any questions for us?' Give two examples of high-impact questions that show curiosity and strategic thinking.",
    rubric: 'Exemplary questions include: 1) "What does stellar success look like in the first 90 days for this role?" 2) "What are the common traits of people who thrive in this company culture?" 3) "What mentorship or training opportunities exist for young recruits?" Penalize saying "No, you covered everything" or only asking about holidays/salary.',
    explanation: 'Asking thoughtful questions flips the dynamic: it demonstrates that you care deeply about doing great work and evaluating whether the company is the right fit for your ambitions.',
    careerTip: 'Prepare 3 to 4 questions in advance in a professional notebook. Ask at least two.'
  },
  {
    id: 10,
    type: 'mc',
    category: 'Professionalism',
    question: 'Which of the following email addresses is the most appropriate to print on your CV and submit on job applications?',
    options: [
      'xX_gamer_legend_2009_Xx@hotmail.com',
      'olivia.taylor.careers@gmail.com',
      'sweet_puppy_lover99@yahoo.co.uk',
      'dont_spam_me_bro@inbox.net'
    ],
    correct: 1, // B
    explanation: 'A clean combination of your first name and last name (with simple punctuation or words like work/careers) establishes an immediate tone of maturity.',
    careerTip: 'Create a dedicated job search email address so important interview invitations never get lost in marketing spam.'
  },
  {
    id: 11,
    type: 'mc',
    category: 'References & Follow-up',
    question: 'How should professional or academic references be formatted on a standard entry-level CV?',
    options: [
      'Print the home addresses and private mobile numbers of your teachers openly on page 1',
      'List your best friends and older siblings as references',
      'Attach 5 scanned paper letters of recommendation directly to your CV file',
      "State 'References available upon request' or leave them for the formal post-interview offer stage"
    ],
    correct: 3, // D
    explanation: 'Save precious CV real estate for your achievements. Prospective employers only check references after a successful interview stage, with your prior consent.',
    careerTip: 'Always ask permission before listing someone as a referee (e.g. form tutor, club coach, or weekend supervisor).'
  },
  {
    id: 12,
    type: 'open',
    category: 'First Impressions',
    question: 'What is the golden rule of thumb for what to wear to an interview when the invitation says "Smart-Casual" or mentions no dress code?',
    rubric: 'Rule: Dress one notch smarter than the day-to-day attire of the workforce (e.g., smart trousers/chinos or tailored skirt, ironed collared shirt/blouse, neat clean shoes). It is always safer to be slightly overdressed than underdressed. Avoid ripped jeans, trainers, hats, or athletic hoodies.',
    explanation: 'Dressing neatly conveys respect for the organization and signals that you take the opportunity seriously from minute one.',
    careerTip: 'Lay your outfit out the night before, inspect for stains or wrinkles, and ensure shoes are clean.'
  },
  {
    id: 13,
    type: 'mc',
    category: 'Interview Strategy',
    question: 'If an interviewer asks a complex or unexpected curveball question and your mind momentarily blanks, what is the best immediate response?',
    options: [
      'Start rambling fast with made-up facts to avoid silence',
      'Stare at the floor in complete silence for three minutes',
      'Take a calm breath and say: "That is a great question. May I take a brief moment to reflect on that?"',
      'Ask the interviewer to skip to the next candidate'
    ],
    correct: 2, // C
    explanation: 'Taking a composed 5-to-10 second pause to organize your thoughts displays emotional poise, composure under pressure, and intellectual honesty.',
    careerTip: 'Taking a sip of water from your glass is another natural, polite way to buy 5 seconds of thinking time.'
  },
  {
    id: 14,
    type: 'mc',
    category: 'CV Writing',
    question: "What does 'tailoring your CV' to a specific job opening actually mean in practice?",
    options: [
      'Printing the document on patterned colored cardstock',
      'Aligning keywords and required competencies from the job description directly into your summary and experience bullet points',
      'Using decorative artistic calligraphy fonts',
      'Rewriting your entire CV in the third-person royal voice'
    ],
    correct: 1, // B
    explanation: 'Tailoring matches your genuine skills to the specific job advert. It helps your application pass Applicant Tracking System (ATS) filters and shows you read the specification.',
    careerTip: 'Highlight the top 5 hard and soft skills in the job specification and make sure those exact words appear naturally in your CV.'
  },
  {
    id: 15,
    type: 'open',
    category: 'References & Follow-up',
    question: 'What is the ideal follow-up protocol within 24 hours after completing a job or apprenticeship interview?',
    rubric: 'Send a prompt, polite thank-you email within 24 hours that: 1) Expresses gratitude to the interviewers for their time. 2) Reaffirms enthusiastic interest in the role. 3) Briefly references one memorable topic or project discussed in the interview. Keep it concise (2-3 paragraphs).',
    explanation: 'A follow-up email demonstrates exceptional courtesy, reinforces key strengths discussed, and leaves a lasting positive impression while decisions are being finalized.',
    careerTip: 'Double-check spelling of the interviewer’s name and title before clicking send.'
  },
  {
    id: 16,
    type: 'mc',
    category: 'First Impressions',
    question: 'During an interview, which body language habit best conveys confidence, engagement, and warmth?',
    options: [
      'Maintaining natural eye contact, upright open posture, and occasional nodding when listening',
      'Crossing your arms tightly across your chest and leaning back in the chair',
      'Staring unblinkingly at the interviewer’s forehead without smiling or reacting',
      'Slouching sideways and twirling a pen continuously on the table'
    ],
    correct: 0, // A
    explanation: 'Open body posture and steady eye contact build rapport and signal active listening, enthusiasm, and self-confidence.',
    careerTip: 'In virtual video interviews, remember to look at the webcam lens periodically, not just the screen, to simulate direct eye contact.'
  },
  {
    id: 17,
    type: 'mc',
    category: 'CV Structure',
    question: "What is the purpose of an 'Applicant Tracking System' (ATS) used by modern employers?",
    options: [
      'A software system that automatically scans and parses CVs for keywords, skills, and qualifications before human review',
      'A GPS tracker that follows interviewees on their commute',
      'A tool that automatically writes cover letters for candidates',
      'A social media app for high school students'
    ],
    correct: 0, // A
    explanation: 'Large companies use ATS software to filter high volumes of applications. Simple formatting (no tables, graphics, or text boxes) ensures your CV parses accurately.',
    careerTip: 'Save and submit your CV as a clean PDF or .docx unless specified otherwise, avoiding complex two-column graphic templates that scramble in ATS.'
  },
  {
    id: 18,
    type: 'open',
    category: 'Interview Strategy',
    question: "The interviewer asks: 'Tell me about a time you had a conflict with a teammate or classmate. How did you resolve it?' What should your answer highlight?",
    rubric: 'Candidate should: 1) Describe a real project disagreement objectively without badmouthing the teammate. 2) Focus on constructive communication (listening to perspectives, seeking common ground). 3) Highlight the collaborative solution and positive outcome for the shared goal.',
    explanation: 'Employers ask this to test your emotional maturity, de-escalation skills, and ability to prioritize collective success over personal ego.',
    careerTip: 'Never say "I have never had any disagreements." Disagreements are normal; mature resolution is what counts.'
  },
  {
    id: 19,
    type: 'mc',
    category: 'Professionalism',
    question: 'Before attending an interview, what is the minimum preparation you should do regarding the company itself?',
    options: [
      'None; it is better to go in with an open mind',
      'Memorize the names of every single employee on LinkedIn',
      'Research their mission, recent news/projects, core products/services, and customer values',
      'Send a social media message to the CEO the morning of the interview'
    ],
    correct: 2, // C
    explanation: 'Demonstrating that you understand what the company actually does and who their clients are distinguishes you from 80% of unprepared applicants.',
    careerTip: 'Check their "About Us" page, social feeds, and recent press releases. Note down 2 interesting facts to mention naturally.'
  },
  {
    id: 20,
    type: 'mc',
    category: 'First Impressions',
    question: 'How early should you arrive for an in-person job interview?',
    options: [
      'Exactly on the minute or 2 minutes late to show you are busy',
      '2 hours early and wait in the reception lobby',
      'Arrival time does not matter if you call ahead',
      '10 to 15 minutes before the scheduled time'
    ],
    correct: 3, // D
    explanation: 'Arriving 10-15 minutes early demonstrates punctuality and gives you time to check in, use the restroom, and take three calming breaths.',
    careerTip: 'Arriving more than 20 minutes early can inconvenience the receptionist or interviewer. If very early, wait in a nearby cafe or park.'
  },
  {
    id: 21,
    type: 'mc',
    category: 'CV Structure',
    question: 'What is the recommended approach to including personal hobbies and interests on a student CV?',
    options: [
      'List generic activities like "watching TV, hanging out with friends, eating"',
      'Include 2-3 specific hobbies that demonstrate teamwork, discipline, creativity, or dedication (e.g. marathon training, coding club, chess, music grade)',
      'Fill half the page with video game stats',
      'Never include any hobbies under any circumstances'
    ],
    correct: 1, // B
    explanation: 'Curated hobbies humanize your application and reveal soft skills like discipline (musical instruments, endurance sports) or intellectual curiosity.',
    careerTip: 'Be prepared to talk about any hobby listed—interviewers frequently use them as conversational icebreakers.'
  },
  {
    id: 22,
    type: 'open',
    category: 'Professionalism',
    question: "You realize 10 minutes into an interview that you answered a previous question inaccurately or forgot a crucial achievement. How should you address this?",
    rubric: 'Appropriate handling: Wait for a natural transition or at the end of the next answer, politely say: "Before we continue, may I briefly add one important detail to our earlier discussion regarding [topic]?" Avoid panicking or interrupting the interviewer mid-sentence.',
    explanation: 'Calmly amending your answer shows honesty, thoroughness, and quick thinking without being disruptive.',
    careerTip: 'Mistakes happen in interviews; hiring managers assess how gracefully and calmly you recover.'
  }
];
