/* Speak Up: all lesson words live in this file.
   Edit the text freely. Three rules:
   1. Every item in a "bank" list needs its own short id.
   2. In a quiz question, "best" is the right choice, counting from 0.
   3. The page never tells a student they have a disability. Lessons 1, 3 and 4 do not
      use the word. Lesson 2 talks about "a worker" or "some people", never "you",
      except inside the section the student chooses to open. Keep it that way. */

window.COURSE = {
  title: 'Speak Up',

  checkin: {
    scale: ['Not yet', 'Sometimes', 'Yes'],
    statements: [
      'I can say what I am good at.',
      'I know what helps me do my best.',
      'I can ask a boss or teacher for help.'
    ]
  },

  bank: {
    /* "say" finishes the sentence: I am good at ... */
    strengths: [
      { id: 'ontime',   label: 'Being on time',            say: 'being on time',               icon: 'clock' },
      { id: 'hands',    label: 'Working with my hands',    say: 'working with my hands',       icon: 'tool' },
      { id: 'routine',  label: 'Following a routine',      say: 'following a routine',         icon: 'loop' },
      { id: 'helping',  label: 'Helping people',           say: 'helping people',              icon: 'heart' },
      { id: 'calm',     label: 'Staying calm',             say: 'staying calm',                icon: 'wave' },
      { id: 'neat',     label: 'Keeping things neat',      say: 'keeping things neat',         icon: 'sparkle' },
      { id: 'watching', label: 'Learning by watching',     say: 'learning by watching',        icon: 'eye' },
      { id: 'hardwork', label: 'Working hard',             say: 'working hard',                icon: 'bolt' },
      { id: 'friendly', label: 'Being friendly',           say: 'being friendly',              icon: 'smile' },
      { id: 'details',  label: 'Noticing small details',   say: 'noticing small details',      icon: 'search' },
      { id: 'tech',     label: 'Using phones and computers', say: 'using phones and computers', icon: 'phone' },
      { id: 'names',    label: 'Remembering faces and names', say: 'remembering faces and names', icon: 'badge' }
    ],

    /* The label is used in the sentence: [label] is hard for me.
       "next" lists the helps shown first for that hard thing. */
    hard: [
      { id: 'steps',   label: 'Remembering many steps',     icon: 'list',      next: ['list', 'onestep', 'showme', 'pictures'] },
      { id: 'loud',    label: 'Working in loud places',     icon: 'loud',      next: ['quiet', 'break', 'changes', 'ask'] },
      { id: 'reading', label: 'Reading long instructions',  icon: 'page',      next: ['showme', 'pictures', 'time', 'onestep'] },
      { id: 'changes', label: 'Handling sudden changes',    icon: 'shuffle',   next: ['changes', 'list', 'reminder', 'break'] },
      { id: 'newppl',  label: 'Talking to new people',      icon: 'people',    next: ['showme', 'time', 'ask', 'break'] },
      { id: 'time',    label: 'Keeping track of time',      icon: 'hourglass', next: ['timer', 'reminder', 'list', 'changes'] },
      { id: 'asking',  label: 'Asking for help',            icon: 'help',      next: ['ask', 'reminder', 'list', 'time'] },
      { id: 'focus',   label: 'Staying focused a long time', icon: 'target',   next: ['break', 'quiet', 'onestep', 'timer'] },
      { id: 'fast',    label: 'Understanding fast talking', icon: 'fast',      next: ['slower', 'list', 'showme', 'ask'] },
      { id: 'writing', label: 'Writing things down fast',   icon: 'pencil',    next: ['time', 'pictures', 'list', 'slower'] }
    ],

    /* "say" finishes the sentence: It helps when ... */
    helps: [
      { id: 'list',     label: 'A written list',            say: 'I get a written list',              icon: 'checklist' },
      { id: 'showme',   label: 'Someone shows me first',    say: 'someone shows me first',            icon: 'play' },
      { id: 'onestep',  label: 'One step at a time',        say: 'I get one step at a time',          icon: 'one' },
      { id: 'quiet',    label: 'A quiet spot',              say: 'I have a quiet spot',               icon: 'headphones' },
      { id: 'reminder', label: 'A reminder',                say: 'I get a reminder',                  icon: 'bell' },
      { id: 'time',     label: 'Extra time',                say: 'I have extra time',                 icon: 'moretime' },
      { id: 'changes',  label: 'Knowing about changes early', say: 'I know about changes early',      icon: 'calendar' },
      { id: 'ask',      label: 'Time to ask questions',     say: 'I have time to ask questions',      icon: 'chat' },
      { id: 'pictures', label: 'Pictures or a checklist',   say: 'I can use pictures or a checklist', icon: 'image' },
      { id: 'timer',    label: 'A timer or phone alarm',    say: 'I can use a timer or phone alarm',  icon: 'alarm' },
      { id: 'slower',   label: 'People talking slower',     say: 'people talk a little slower',       icon: 'pause' },
      { id: 'break',    label: 'A short break',             say: 'I can take a short break',          icon: 'cup' }
    ],

    /* Lesson 2. "say" is a full sentence for the student's words. */
    rights: [
      { id: 'plan',      label: 'My plan is about me',            say: 'My school plan is about me, and it is my meeting.',        icon: 'page' },
      { id: 'invited',   label: 'I get invited to my meetings',   say: 'I have the right to be at every meeting about my plan.',   icon: 'calendar' },
      { id: 'questions', label: 'I can ask until I understand',   say: 'I can ask questions until I understand.',                  icon: 'help' },
      { id: 'disagree',  label: 'I can say what I want',          say: 'I can say what I want, and I can disagree.',               icon: 'chat' },
      { id: 'private',   label: 'My information is private',      say: 'I decide who I tell about my private information.',        icon: 'lock' },
      { id: 'change',    label: 'I can ask for a change at work', say: 'At work, I can ask for a change that helps me do my job.', icon: 'checklist' },
      { id: 'paid',      label: 'I get paid and stay safe',       say: 'I have the right to be paid for my work and to be safe at work.', icon: 'shield' }
    ],

    /* Lesson 3. The label is the situation. "say" is how to say it to a supervisor.
       "next" lists the questions shown first. */
    moments: [
      { id: 'many',     label: 'I get too many directions at once',       say: 'I got the first part, but I missed the rest.',             icon: 'list',     next: ['write', 'onestep', 'again', 'show'] },
      { id: 'unsure',   label: 'I do not understand a task',              say: 'I am not sure how to do this task.',                       icon: 'help',     next: ['show', 'write', 'watch', 'again'] },
      { id: 'sched',    label: 'My schedule changes and nobody tells me', say: 'My schedule changed, and I did not know.',                 icon: 'calendar', next: ['ahead', 'write', 'talk', 'again'] },
      { id: 'loud',     label: 'It is too loud or busy to focus',         say: 'It is hard for me to focus when it is this loud.',         icon: 'loud',     next: ['quiet', 'five', 'talk', 'onestep'] },
      { id: 'takeover', label: 'Someone keeps doing my job for me',       say: 'I would like to do this part on my own so I can learn it.', icon: 'people',   next: ['watch', 'talk', 'show', 'onestep'] },
      { id: 'reset',    label: 'I need a break to reset',                 say: 'I am starting to feel overwhelmed.',                       icon: 'cup',      next: ['five', 'quiet', 'talk', 'onestep'] },
      { id: 'mistake',  label: 'I made a mistake',                        say: 'I made a mistake, and I want to fix it.',                  icon: 'loop',     next: ['show', 'watch', 'write', 'talk'] },
      { id: 'more',     label: 'I want to learn something new',           say: 'I would like to learn a new task.',                        icon: 'bolt',     next: ['show', 'watch', 'talk', 'write'] }
    ],

    /* Lesson 3. Each label is the whole question. */
    asks: [
      { id: 'write',   label: 'Can you write the steps down for me?',          icon: 'checklist' },
      { id: 'onestep', label: 'Can you give me one step at a time?',           icon: 'one' },
      { id: 'again',   label: 'Can you say that one more time?',               icon: 'loop' },
      { id: 'show',    label: 'Can you show me how?',                          icon: 'play' },
      { id: 'watch',   label: 'Can you watch me try it and tell me how I did?', icon: 'eye' },
      { id: 'ahead',   label: 'Can you tell me about changes ahead of time?',  icon: 'calendar' },
      { id: 'quiet',   label: 'Can I work in a quieter spot?',                 icon: 'headphones' },
      { id: 'five',    label: 'Can I take five minutes?',                      icon: 'cup' },
      { id: 'talk',    label: 'Can we talk about what would work?',            icon: 'chat' }
    ],

    /* Lesson 4. Listed from the first step to the top step. */
    ladder: [
      { id: 'intro', label: 'Introduce myself and say why we are here', icon: 'smile' },
      { id: 'share', label: 'Share my strengths and what helps me',     icon: 'bolt' },
      { id: 'goal',  label: 'Say one goal I want',                      icon: 'target' },
      { id: 'ask',   label: 'Ask questions and say if I disagree',      icon: 'help' },
      { id: 'lead',  label: 'Lead part of my meeting',                  icon: 'people' }
    ],

    /* Lesson 4. "say" finishes the sentence: After TRACE, I want to ... */
    goals: [
      { id: 'job',     label: 'Work at a job I like',          say: 'work at a job I like',             icon: 'badge' },
      { id: 'class',   label: 'Take a class or training',      say: 'take a class or get more training', icon: 'page' },
      { id: 'own',     label: 'Live more on my own',           say: 'live more on my own',              icon: 'home' },
      { id: 'travel',  label: 'Get around on my own',          say: 'get around on my own',             icon: 'shuffle' },
      { id: 'money',   label: 'Handle my own money',           say: 'handle my own money',              icon: 'coin' },
      { id: 'friends', label: 'Do more with friends',          say: 'spend more time with friends doing things I enjoy', icon: 'heart' }
    ]
  },

  lessons: [
    /* ================================================================
       LESSON 1
       ================================================================ */
    {
      id: 'l1',
      title: 'Know yourself',
      idea: 'What you are good at, what is hard, and what helps.',
      screens: [
        {
          type: 'say',
          h: 'Nobody knows you better than you do.',
          body: [
            'A new boss does not know you yet. A new teacher has to guess. Even people who care about you get it wrong sometimes.',
            'You are the expert on you. This lesson is about getting clear on what you know, so you can say it to other people.'
          ]
        },
        {
          type: 'checkin',
          when: 'before',
          h: 'First, a quick check.',
          body: ['There are no wrong answers. Pick what is true for you today.']
        },
        {
          type: 'say',
          h: 'Speaking up for yourself has a name.',
          body: [
            'It is called self-advocacy. It means telling people what you want and what you need, so you can do your best.',
            'Adults do it every day, in a lot of places.'
          ],
          points: [
            { icon: 'badge', text: 'At work', more: 'Telling a supervisor you need the steps written down.' },
            { icon: 'people', text: 'In a meeting about you', more: 'Telling your team what kind of job you want.' },
            { icon: 'heart', text: 'At the doctor', more: 'Saying, “I don’t understand. Can you explain that again?”' },
            { icon: 'home', text: 'At home', more: 'Telling your family you want to make your own choice.' }
          ]
        },
        {
          type: 'say',
          h: 'What self-advocacy is not.',
          body: ['People mix it up with other things. Here are three it is not.'],
          points: [
            { text: 'It is not doing everything alone.', more: 'Asking for help is part of it. Knowing when to ask is a skill.' },
            { text: 'It is not complaining.', more: 'A complaint stops at the problem. Self-advocacy says what would fix it.' },
            { text: 'It is not being rude.', more: 'You can be clear and respectful at the same time.' }
          ]
        },
        {
          type: 'say',
          h: 'Why it matters.',
          body: [
            'When people do not know what you need, they guess. Often they guess wrong.',
            'At school, people come to you with help. At a job, mostly nobody will. If you need something, you are the one who has to say it.',
            'Researchers followed students after they left school. The ones who were better at making choices and speaking up for themselves were more likely to have a job a year later.'
          ]
        },
        {
          type: 'say',
          h: 'To speak up, you need to know three things.',
          body: ['The rest of this lesson takes them one at a time. At the end you will put them together in your own words.'],
          points: [
            { icon: 'bolt', text: 'What I am good at', more: 'Your strengths.' },
            { icon: 'list', text: 'What is hard for me', more: 'The specific things, not “everything.”' },
            { icon: 'checklist', text: 'What helps me', more: 'The changes that make the hard things easier.' }
          ]
        },
        {
          type: 'say',
          h: 'Part 1: Your strengths.',
          body: ['A strength is anything you do well. It does not have to be a big talent. There are three kinds.'],
          points: [
            { icon: 'tool', text: 'Things you can do', more: 'Stocking shelves. Using a register. Fixing things. Cooking.' },
            { icon: 'clock', text: 'How you work', more: 'On time. Careful. You finish what you start.' },
            { icon: 'smile', text: 'How you are with people', more: 'Friendly. Patient. A good listener.' }
          ]
        },
        {
          type: 'say',
          h: 'How to find your strengths.',
          body: ['Some people find this part hard. If you are stuck, ask yourself these three questions.'],
          points: [
            { text: 'What do people thank me for?' },
            { text: 'What do I do without being told?' },
            { text: 'What feels easy for me that is hard for other people?' }
          ],
          after: ['Employers hire people for their strengths. That is why you say yours first.']
        },
        {
          type: 'pick',
          bank: 'strengths',
          count: 3,
          h: 'What are you good at?',
          body: ['Pick 3. Think about work, school, and home.'],
          ownLead: 'I am good at',
          ownHint: 'fixing bikes'
        },
        {
          type: 'say',
          h: 'Part 2: What is hard for you.',
          body: [
            'Everyone has things that are hard. Your boss does. Your teachers do. Every person you know does.',
            'Hard is not the same as “can’t.” Hard means you do it better with the right help.',
            'Saying what is hard is not a weakness. It is useful information. It tells people where to help.'
          ]
        },
        {
          type: 'say',
          h: 'Be specific.',
          body: ['If you say something too big, nobody knows how to help. Name the exact thing.'],
          pairs: {
            left: 'Too big to help with',
            right: 'Clear',
            rows: [
              ['“Work is hard.”', '“Remembering many steps is hard.”'],
              ['“I’m bad with people.”', '“Talking to new people is hard.”'],
              ['“I can’t focus.”', '“Staying focused in a loud place is hard.”']
            ]
          },
          after: ['The clear ones point straight at a fix.']
        },
        {
          type: 'pick',
          bank: 'hard',
          count: 2,
          h: 'What is hard for you?',
          body: ['Pick 2. Be honest and be specific. This is how you find out what helps.'],
          ownTail: 'is hard for me',
          ownHint: 'Standing all day'
        },
        {
          type: 'say',
          h: 'Part 3: What helps.',
          body: [
            'A help is a real change that someone can make. “Try harder” is not a help. “Give me a written list” is.',
            'Most helps are one of three kinds.'
          ],
          points: [
            { icon: 'checklist', text: 'A tool', more: 'A written list. A timer. Pictures of each step.' },
            { icon: 'chat', text: 'A change in how people tell you things', more: 'Show me first. One step at a time. Talk a little slower.' },
            { icon: 'moretime', text: 'A change in time or place', more: 'Extra time. A quiet spot. A short break.' }
          ],
          after: ['At work and at school, a help like this has a name: an accommodation. Lesson 2 is about how to get one.']
        },
        { type: 'pickfor', parent: 'hard', parentBank: 'hard', slot: 0, bank: 'helps', h: 'What helps with this?', chip: '{x} is hard for you.', body: ['Pick 1 or 2 things that make it easier.'], ownLead: 'It helps when', ownHint: 'I can sit down' },
        { type: 'pickfor', parent: 'hard', parentBank: 'hard', slot: 1, bank: 'helps', h: 'What helps with this?', chip: '{x} is hard for you.', body: ['Pick 1 or 2 things that make it easier.'], ownLead: 'It helps when', ownHint: 'I can sit down' },
        {
          type: 'say',
          h: 'Now put the three parts together.',
          body: ['Say them in this order. Here is how one person did it.'],
          points: [
            { icon: 'bolt', text: '“I’m good at keeping things neat.”', more: 'Strength first. People hear what you can do.' },
            { icon: 'list', text: '“Long lists are hard for me.”', more: 'Then the hard thing. Short and specific.' },
            { icon: 'checklist', text: '“A written list helps.”', more: 'End with the help. Now they know what to do.' }
          ]
        },
        {
          type: 'story',
          h: 'Try it: Maya’s first day',
          scene: [
            'Maya just started at a grocery store. Her new supervisor, Mr. Reyes, is friendly.',
            'He asks, “Is there anything I should know to help you do well here?”'
          ],
          ask: 'What should Maya say?',
          choices: [
            {
              text: '“I don’t know.”',
              good: false,
              result: 'Mr. Reyes nods and walks away. He still knows nothing about Maya. Later he gives her a long list of jobs out loud, and she forgets half of them.'
            },
            {
              text: '“No, I’m fine.”',
              good: false,
              result: 'Mr. Reyes says okay. But Maya is not fine when the store gets loud and busy. Now it feels harder to bring it up.'
            },
            {
              text: '“I’m good at keeping things neat. Long lists are hard for me. A written list helps.”',
              good: true,
              result: 'Mr. Reyes says, “Good to know.” He writes her jobs on a card. Maya finishes all of them. She knew herself, so she could tell him.'
            }
          ]
        },
        { type: 'q', n: 0 }, { type: 'q', n: 1 }, { type: 'q', n: 2 },
        { type: 'q', n: 3 }, { type: 'q', n: 4 }, { type: 'q', n: 5 },
        { type: 'build' },
        { type: 'done' }
      ],

      /* Shown on the last screen and printed on the sheet. */
      todo: [
        'Read my words out loud to a staff member.',
        'Ask one person who knows me: “What do you think I am good at?”'
      ],

      /* "skill" is the short name staff see on the printed sheet. */
      quiz: [
        {
          skill: 'Naming strengths',
          scene: 'A new boss asks Chris, “What are you good at?”',
          ask: 'What is the best answer?',
          choices: ['“I don’t know.”', '“I’m on time, and I learn routines fast.”', '“Nothing, really.”'],
          best: 1,
          why: 'Chris names real things he is good at. Now the boss knows what Chris brings to the job.'
        },
        {
          skill: 'Telling a help from a hard thing',
          scene: 'Loud places make it hard for Dee to focus at work.',
          ask: 'Which one is something that HELPS Dee?',
          choices: ['Wearing earplugs in the stockroom', 'Loud places are hard', 'Being a hard worker'],
          best: 0,
          why: 'Earplugs are a help. “Loud places are hard” is the hard thing. “Hard worker” is a strength.'
        },
        {
          skill: 'Being specific',
          scene: 'Sam’s supervisor asks, “What part of the job is hard for you?”',
          ask: 'Which answer helps the supervisor most?',
          choices: ['“Kind of everything.”', '“Nothing. I’m fine.”', '“Keeping track of time is hard for me.”'],
          best: 2,
          why: 'It names one exact thing. Now the supervisor can think of a fix, like a timer or a reminder.'
        },
        {
          skill: 'Seeing a need, not a failure',
          scene: 'Jo keeps forgetting steps when she closes the cafe.',
          ask: 'What is the best thing for Jo to think?',
          choices: ['“I am bad at this job.”', '“This is my boss’s fault.”', '“Many steps are hard for me. A checklist would help.”'],
          best: 2,
          why: 'Jo knows what is hard and what helps. That is something she can ask for.'
        },
        {
          skill: 'Knowing what self-advocacy is',
          scene: 'Lee is stuck on a task. Lee thinks, “If I ask for help, I am not standing up for myself.”',
          ask: 'What is true?',
          choices: ['Lee is right. Do it alone.', 'Asking for the help you need IS speaking up for yourself.', 'Lee should wait until someone notices.'],
          best: 1,
          why: 'Self-advocacy does not mean doing everything alone. It means knowing when to ask, and asking.'
        },
        {
          skill: 'Speaking for yourself',
          scene: 'Ari’s job coach says, “Ari likes working in the back.” But Ari likes helping customers.',
          ask: 'What should Ari do?',
          choices: ['Stay quiet. The job coach knows best.', 'Get mad and walk out.', 'Say, “Actually, I like helping customers.”'],
          best: 2,
          why: 'Ari is the expert on Ari. Saying it calmly lets people plan around what Ari really wants.'
        }
      ]
    },

    /* ================================================================
       LESSON 2
       Legal lines checked 2026-11-17 against EEOC guidance (see PLAN.md).
       ================================================================ */
    {
      id: 'l2',
      title: 'Know your rights',
      idea: 'Right now help comes to you. Later, you ask for it.',
      recap: [
        {
          scene: 'Think back to Lesson 1. A supervisor asks Pat what is hard at work.',
          ask: 'Which answer is specific enough to help?',
          choices: ['“Work is hard.”', '“Reading long instructions is hard for me.”', '“I don’t know.”'],
          best: 1,
          why: 'It names the exact thing. A clear answer points straight at a fix.'
        },
        {
          scene: 'In Lesson 1 you put three parts together: what you are good at, what is hard, and what helps.',
          ask: 'Which part do you say first?',
          choices: ['What is hard', 'What helps', 'What you are good at'],
          best: 2,
          why: 'Strength first. People hear what you can do before they hear what you need.'
        }
      ],
      screens: [
        { type: 'q', set: 'recap', n: 0 }, { type: 'q', set: 'recap', n: 1 },
        {
          type: 'say',
          h: 'Right now, help comes to you.',
          body: ['At school, adults plan your support. After TRACE, that changes. It is one of the biggest changes of adult life, and most people are not ready for it.'],
          pairs: {
            plain: true,
            left: 'Now, at school',
            right: 'Later, at a job or college',
            rows: [
              ['Staff find out what you need.', 'You tell them what you need.'],
              ['Support is set up for you.', 'You ask for it.'],
              ['Your teachers talk to each other.', 'Nobody knows unless you say so.']
            ]
          },
          after: ['That is why knowing your rights matters. You cannot ask for something you do not know you can have.']
        },
        {
          type: 'say',
          h: 'What is a right?',
          body: [
            'A right is something the rules say you get. When you use a right, nobody is doing you a favor.',
            'A right only works if you know about it and use it. This lesson covers your rights at school, your rights at work, and how to ask for a change at a job.'
          ]
        },
        {
          type: 'say',
          h: 'Your rights at school, as an adult.',
          body: ['You have a written school plan called an IEP. It lists your goals and the support you get. Because you are an adult, the rights that go with it belong to you.'],
          points: [
            { icon: 'page', text: 'The plan is about you.', more: 'Your goals. Your support. Your future.' },
            { icon: 'calendar', text: 'You are invited to every meeting about it.', more: 'The meeting is not supposed to happen without you being asked.' },
            { icon: 'help', text: 'You can ask questions until you understand.', more: 'Nobody should rush you past something that is about your life.' },
            { icon: 'chat', text: 'You can say what you want, and you can disagree.', more: 'The team has to listen to you.' },
            { icon: 'lock', text: 'Your school records are private.', more: 'You decide who outside the school gets to see them.' }
          ]
        },
        {
          type: 'say',
          h: 'What changed when you turned 18.',
          body: [
            'Before 18, your parents made the decisions about your school plan. At 18, in California, those decisions became yours.',
            'You can still ask your family for advice. Many adults do. But the choice is yours to make.',
            'For a few students, a court has given that job to someone else. If you are not sure how it works for you, ask your case manager.'
          ]
        },
        {
          type: 'say',
          h: 'Your rights at work.',
          body: ['Every worker has these. You do not have to earn them.'],
          points: [
            { icon: 'coin', text: 'To be paid for every hour you work.', more: 'At least minimum wage, on a regular payday.' },
            { icon: 'shield', text: 'To be safe.', more: 'You get training and safety gear for the job.' },
            { icon: 'cup', text: 'To take breaks on longer shifts.', more: 'Ask your supervisor when yours are.' },
            { icon: 'heart', text: 'To be treated fairly.', more: 'Nobody is allowed to harass you or treat you worse because of who you are.' }
          ],
          after: ['If something feels wrong at work, tell your job coach or case manager. You do not have to figure it out alone.']
        },
        {
          type: 'say',
          h: 'A change that helps you do the job.',
          body: [
            'In Lesson 1 you learned the word accommodation. It is a change that helps a person do their job well.',
            'Some people have a disability. It can be something you can see, or something you cannot, like a learning disability, autism, ADHD, anxiety, or a health condition.',
            'The law says a worker with a disability can ask for accommodations, and the employer has to take the request seriously.'
          ],
          points: [
            { icon: 'checklist', text: 'Written steps, not just spoken ones.' },
            { icon: 'play', text: 'Training by watching, not by reading a thick binder.' },
            { icon: 'headphones', text: 'A quieter place to work.' },
            { icon: 'calendar', text: 'A schedule that stays the same each week.' }
          ],
          after: ['Most of these cost very little. About half cost the employer nothing at all.']
        },
        {
          type: 'say',
          h: 'What “reasonable” means.',
          body: ['The law calls them reasonable accommodations. Reasonable means the change helps you do the job. It does not mean the job goes away. You still do the main parts of it.'],
          pairs: {
            left: 'Not reasonable',
            right: 'Reasonable',
            rows: [
              ['Someone else does your job.', 'You get the steps in writing.'],
              ['You skip the main part of the job.', 'You learn the job a different way.'],
              ['You get paid without working.', 'You take a short break to reset.']
            ]
          }
        },
        {
          type: 'say',
          h: 'How asking works.',
          body: ['The employer does not have to guess. Here is how it goes.'],
          ordered: true,
          points: [
            { text: 'You start it.', more: 'Tell your supervisor or the HR office that you need a change.' },
            { text: 'Plain words are fine.', more: 'You do not need legal words. You do not have to put it in writing.' },
            { text: 'They may ask for a note.', more: 'If the reason is not easy to see, they can ask for a paper from a doctor or your school.' },
            { text: 'You work it out together.', more: 'They might offer a different change that also solves the problem. That is allowed.' }
          ],
          after: ['It is against the law to punish a worker for asking.']
        },
        {
          type: 'sort',
          h: 'True or myth?',
          body: ['Read each one. Is it true, or is it a myth?'],
          piles: ['True', 'Myth'],
          items: [
            { text: '“My boss already knows what I need.”', pile: 1, why: 'A boss cannot read minds. At a job, nobody knows unless you say so.' },
            { text: '“I can ask for a change in plain words.”', pile: 0, why: 'You do not need special words. “A written list would help me” is enough to start.' },
            { text: '“My IEP comes with me to my job.”', pile: 1, why: 'Your IEP stays at school. At a job, you start the conversation yourself.' },
            { text: '“Asking for help means I am bad at my job.”', pile: 1, why: 'Good workers ask for what they need. It shows you want to do the job right.' },
            { text: '“I have to tell everyone at work my private information.”', pile: 1, why: 'You decide who knows. Most coworkers never need to.' },
            { text: '“I still have to do the main parts of my job.”', pile: 0, why: 'An accommodation changes how you do the job. It does not take the job away.' }
          ]
        },
        {
          type: 'say',
          h: 'Privacy is a right too.',
          body: [
            'Your health, your school records, and your personal story belong to you. You choose who hears them.',
            'When a worker tells an employer about a disability to get an accommodation, the employer has to keep that information private. A supervisor is not allowed to announce it to the team.',
            'If a coworker asks why you do something a different way, you can say, “It helps me do my job well.” That is a full answer.'
          ]
        },
        {
          type: 'optin',
          key: 'disc',
          h: 'One more topic, if you want it.',
          body: [
            'Some workers choose to tell an employer about a disability. Some choose not to. This short section explains how that choice works.',
            'It is up to you whether to read it. Skipping it does not change your score.'
          ],
          yes: 'Yes, show me that section.',
          no: 'Skip it for now.'
        },
        {
          type: 'say', only: 'disc',
          h: 'Telling is a choice.',
          body: ['Telling an employer about a disability is called disclosure. Nobody has to do it. People think about both sides before they decide.'],
          pairs: {
            plain: true,
            left: 'Reasons people tell',
            right: 'Reasons people do not',
            rows: [
              ['To get an accommodation.', 'They do not need any changes.'],
              ['To explain what helps them.', 'They worry about being treated differently.'],
              ['So they do not have to hide it.', 'They feel it is private.']
            ]
          },
          after: ['Both choices are okay. It can be different at different jobs.']
        },
        {
          type: 'say', only: 'disc',
          h: 'The trade-off.',
          body: [
            'To get an accommodation under the law, a worker has to tell the employer enough to show why they need it.',
            'Enough does not mean everything. It means the part that connects to the job.'
          ],
          points: [
            { text: 'Before a job offer', more: 'An employer is not allowed to ask if you have a disability. You do not have to bring it up.' },
            { text: 'After a job offer', more: 'A common time to tell. They already decided they want you.' },
            { text: 'Any time after you start', more: 'Also fine. Sooner is better than waiting until there is a big problem.' }
          ]
        },
        {
          type: 'say', only: 'disc',
          h: 'How people say it.',
          body: [
            'A worker does not have to name a diagnosis. They can describe what is hard and what helps. That is often clearer anyway.',
            'Tell the supervisor or the HR office. Not the whole team.'
          ],
          points: [
            { icon: 'chat', text: '“I have a condition that makes it hard to remember spoken directions. Written steps help me do the job well.”' },
            { icon: 'chat', text: '“I learn best by watching. Could someone show me the task first?”' }
          ],
          after: ['If you ever want to practice this, your case manager or job coach can help you plan what to say.']
        },
        {
          type: 'say',
          h: 'You do not have to do this alone.',
          body: ['Knowing your rights does not mean handling everything by yourself. These people can help.'],
          points: [
            { icon: 'people', text: 'Your case manager, teacher, or job coach', more: 'Start here. They can help you practice what to say.' },
            { icon: 'badge', text: 'Your Department of Rehabilitation counselor', more: 'If you have one, they help with jobs and what you need to keep one.' },
            { icon: 'phone', text: 'The Job Accommodation Network', more: 'Free advice about accommodations. The website is askjan.org.' }
          ]
        },
        {
          type: 'story',
          h: 'Try it: Devon’s training',
          scene: [
            'Devon was just hired at a hardware store. On day one, the manager hands him a thick binder and says, “Read this by Friday.”',
            'Reading long instructions is hard for Devon. He learns fast when someone shows him.'
          ],
          ask: 'What should Devon do?',
          choices: [
            {
              text: 'Take the binder home and hope for the best.',
              good: false,
              result: 'Devon gets through ten pages. On Friday the manager asks about the return policy, and Devon does not know it. The manager thinks Devon did not try.'
            },
            {
              text: 'Say, “I learn best by watching. Could someone show me the main tasks, and could I get a short checklist?”',
              good: true,
              result: 'The manager says, “Sure, shadow Kim tomorrow.” Devon learns the register in one morning. He asked in plain words for a change that helps him do the job.'
            },
            {
              text: 'Decide this job is not for him and stop showing up.',
              good: false,
              result: 'Devon loses a job he could have been good at. The manager never knew there was an easy fix.'
            }
          ]
        },
        {
          type: 'story',
          h: 'Try it: Alma’s schedule',
          scene: [
            'Alma is 19. She hears two staff members planning her schedule for next semester. Nobody has asked her what she wants.',
            'Alma wants a morning job site so she can keep her afternoon class.'
          ],
          ask: 'What should Alma do?',
          choices: [
            {
              text: 'Say nothing. They are the staff.',
              good: false,
              result: 'Alma gets an afternoon job site and has to drop her class. The staff never knew it mattered to her.'
            },
            {
              text: 'Say, “That is my schedule. I would like to be part of that decision.”',
              good: true,
              result: 'The staff say, “You are right. What works for you?” Alma tells them about her class and gets a morning site. It is her plan, and she has the right to be included.'
            },
            {
              text: 'Complain about it to her friends later.',
              good: false,
              result: 'Her friends agree it is unfair. Nothing changes, because the people who can fix it never heard about it.'
            }
          ]
        },
        {
          type: 'pick', bank: 'rights', count: 2, wide: true,
          h: 'Which rights do you most want to remember?',
          body: ['Pick 2. These go on your sheet.']
        },
        {
          type: 'pick', bank: 'helps', save: 'jobhelps', min: 1, max: 2,
          h: 'At a job, what might you ask for?',
          body: ['Pick 1 or 2 changes that would help you do a job well.'],
          ownLead: 'It helps when', ownHint: 'I can sit down'
        },
        { type: 'q', n: 0 }, { type: 'q', n: 1 }, { type: 'q', n: 2 },
        { type: 'q', n: 3 }, { type: 'q', n: 4 }, { type: 'q', n: 5 },
        { type: 'build', h: 'These are your rights, in your words.' },
        { type: 'done' }
      ],
      todo: [
        'Read my words out loud to a staff member.',
        'Ask my case manager: “When is my next IEP meeting?”'
      ],
      card: {
        h: 'How asking for a change works',
        ordered: true,
        items: ['I start it. Nobody will guess.', 'Plain words are fine.', 'They may ask for a note.', 'We work it out together.']
      },
      quiz: [
        {
          skill: 'Starting the conversation',
          scene: 'Mia starts her first job after TRACE. She does her best work when the steps are written down.',
          ask: 'Whose job is it to bring that up?',
          choices: ['Her old teacher’s', 'Mia’s', 'Her new boss should figure it out'],
          best: 1,
          why: 'At a job, nobody knows unless you say so. Mia starts the conversation.'
        },
        {
          skill: 'Telling what is reasonable',
          scene: 'Jordan stocks shelves at a store. He wants to ask for a change.',
          ask: 'Which one is a reasonable thing to ask for?',
          choices: ['A list of the aisles in the order to stock them', 'A coworker stocks the shelves for him', 'Getting paid for days he does not work'],
          best: 0,
          why: 'A list changes how Jordan does the job. He still does the job.'
        },
        {
          skill: 'Asking in plain words',
          scene: 'Theo wants to ask his supervisor for a quieter place to work.',
          ask: 'What does Theo need to do?',
          choices: ['Use special legal words', 'Bring a lawyer', 'Ask in plain words, like “A quieter spot would help me focus.”'],
          best: 2,
          why: 'Plain words are enough. No special words and no lawyer are needed to ask.'
        },
        {
          skill: 'Knowing the IEP stays behind',
          scene: 'Rosa thinks her new boss will read her IEP and know what she needs.',
          ask: 'What is true?',
          choices: ['The school sends the IEP to every job.', 'Bosses are not allowed to help.', 'Her IEP stays at school. Rosa tells her boss what helps.'],
          best: 2,
          why: 'The IEP is a school plan. At work, Rosa is the one who shares what helps her.'
        },
        {
          skill: 'Knowing adult rights at school',
          scene: 'Kai is 19. A meeting about Kai’s school plan gets set up, and nobody tells Kai.',
          ask: 'What is true?',
          choices: ['Kai has the right to be invited and to take part.', 'That is fine. The meeting is for adults.', 'Kai is only allowed to listen.'],
          best: 0,
          why: 'Kai is an adult, and it is Kai’s plan. Kai has the right to be there and to speak.'
        },
        {
          skill: 'Protecting privacy',
          scene: 'A coworker asks Ana, “Why do you get your tasks on a card?”',
          ask: 'What is a good answer?',
          choices: ['Ana has to explain her whole story.', '“It helps me do my job well.”', 'Ana should stop using the card.'],
          best: 1,
          why: 'Ana decides what to share. A short, friendly answer is enough.'
        }
      ]
    },

    /* ================================================================
       LESSON 3
       ================================================================ */
    {
      id: 'l3',
      title: 'Speak up at work',
      idea: 'Three ways to respond, and the one that works.',
      recap: [
        {
          scene: 'Think back to Lesson 1. Tom tells his supervisor, “I’m good at staying calm. Loud places are hard for me. A quiet spot helps.”',
          ask: 'What did Tom do well?',
          choices: ['He complained about the store.', 'He said a strength, a hard thing, and a help.', 'He kept it to himself.'],
          best: 1,
          why: 'Those are the three parts: what I am good at, what is hard, and what helps.'
        },
        {
          scene: 'Think back to Lesson 2. Nina starts a new job. She does her best work with written steps.',
          ask: 'How will her new boss find out?',
          choices: ['Nina tells them.', 'Her IEP gets sent to the job.', 'The boss will guess.'],
          best: 0,
          why: 'After school, you start the conversation. Nobody knows unless you say so.'
        }
      ],
      screens: [
        { type: 'q', set: 'recap', n: 0 }, { type: 'q', set: 'recap', n: 1 },
        {
          type: 'say',
          h: 'Knowing what you need is half of it.',
          body: [
            'The other half is saying it out loud to the person who can do something about it.',
            'Almost everybody finds this hard at first. It is a skill, like any part of a job. It gets easier every time you do it.'
          ]
        },
        {
          type: 'say',
          h: 'There are three ways to respond.',
          body: ['When something goes wrong at work, people usually do one of these.'],
          points: [
            { icon: 'pause', text: 'Stay quiet', more: 'You say nothing and hope it goes away. The problem stays, and the stress builds up.' },
            { icon: 'loud', text: 'Blow up', more: 'You yell, blame someone, or walk off. People remember the blow-up and forget the problem.' },
            { icon: 'chat', text: 'Speak up', more: 'You stay calm, say what is going on, and ask for what would help. The problem can get fixed.' }
          ]
        },
        {
          type: 'sort',
          h: 'Which way is it?',
          body: ['Each line is something a worker might do or say. Sort it.'],
          piles: ['Stay quiet', 'Blow up', 'Speak up'],
          items: [
            { text: '“Whatever. It’s fine.” (It is not fine.)', pile: 0, why: 'Saying it is fine when it is not hides the problem. Nobody can fix what they do not know about.' },
            { text: '“You never tell me anything! This place is a mess!”', pile: 1, why: 'It blames and it is loud. The other person will defend themselves and stop listening.' },
            { text: '“I missed the last part. Can you say it again?”', pile: 2, why: 'Calm, clear, and it ends with a question the other person can say yes to.' },
            { text: 'Walking out in the middle of a shift without telling anyone.', pile: 1, why: 'Leaving without a word is a blow-up, even if it is a quiet one.' },
            { text: 'Doing the task wrong because you did not want to ask.', pile: 0, why: 'Guessing to avoid asking is staying quiet. The mistake usually shows up later.' },
            { text: '“I need a few minutes to reset. Can I take my break now?”', pile: 2, why: 'It says what is going on and asks for something specific.' }
          ]
        },
        {
          type: 'say',
          h: 'Why staying quiet feels safe, and what it costs.',
          body: [
            'Staying quiet feels like the polite choice. Nobody gets upset. But it has a price.',
            'Small problems grow. Your supervisor thinks everything is fine. You keep making the same mistake. And one day it comes out as a blow-up.'
          ],
          after: ['Speaking up early, about a small thing, is the easiest time to do it.']
        },
        {
          type: 'say',
          h: 'How to speak up, in four steps.',
          body: ['This works for almost any problem at work. The next screens take each step in turn.'],
          ordered: true,
          points: [
            { text: 'Pick your moment.', more: 'Choose a time when the person can listen.' },
            { text: 'Say what is going on.', more: 'Stick to the facts. Start with “I.”' },
            { text: 'Say what would help.', more: 'One clear idea.' },
            { text: 'Ask, then say thanks.', more: 'End with a real question.' }
          ]
        },
        {
          type: 'say',
          h: 'Step 1: Pick your moment.',
          body: ['The same words work better at the right time. Start with, “Do you have a minute?”'],
          pairs: {
            left: 'Bad time',
            right: 'Good time',
            rows: [
              ['In front of a customer.', 'When your supervisor is free.'],
              ['In the middle of a rush.', 'At the start of a shift, or on a break.'],
              ['Weeks later, when you are fed up.', 'Soon after the problem starts.']
            ]
          },
          after: ['If something is not safe, do not wait. Say it right away.']
        },
        {
          type: 'say',
          h: 'Step 2: Say what is going on.',
          body: ['Start with “I” and stick to what happened. When a sentence starts with “You,” the other person hears blame and stops listening.'],
          pairs: {
            left: 'Starts with “You”',
            right: 'Starts with “I”',
            rows: [
              ['“You talk too fast.”', '“I missed some of that.”'],
              ['“You never tell me anything.”', '“I did not know my schedule changed.”'],
              ['“You are always on my case.”', '“I want to get this right.”']
            ]
          }
        },
        {
          type: 'say',
          h: 'Steps 3 and 4: Say what helps, and ask.',
          body: [
            'Do not stop at the problem. Bring one idea that would help. You know yours from Lesson 1.',
            'Then turn it into a question. A question gives the other person something clear to say yes to.'
          ],
          points: [
            { icon: 'chat', text: '“Can you write the steps down for me?”' },
            { icon: 'chat', text: '“Can you show me one more time?”' },
            { icon: 'chat', text: '“Can I take five minutes?”' }
          ],
          after: ['Finish with “Thank you.” People help again when they feel thanked.']
        },
        {
          type: 'say',
          h: 'How you say it matters too.',
          body: ['Your voice and your body are part of the message.'],
          points: [
            { icon: 'wave', text: 'Use a calm, steady voice.', more: 'Not a whisper. Not a shout.' },
            { icon: 'smile', text: 'Face the person.', more: 'Turn toward them so they know you are talking to them.' },
            { icon: 'cup', text: 'If you are upset, wait.', more: 'Take a few minutes first. You can say, “I need a minute. Can we talk after my break?”' }
          ]
        },
        {
          type: 'say',
          h: 'Who do you go to?',
          body: ['Workplaces have rules nobody writes down. One of them is who to ask about what.'],
          points: [
            { icon: 'badge', text: 'Your supervisor', more: 'Your tasks, your schedule, and what you need to do the job.' },
            { icon: 'people', text: 'A coworker', more: 'Quick questions, like where something goes or how a machine works.' },
            { icon: 'heart', text: 'Your job coach or teacher', more: 'To practice first, or when you tried and it did not work.' }
          ],
          after: ['Your job coach is there to help you speak, not to speak for you. You can say, “I would like to say it myself.”']
        },
        {
          type: 'say',
          h: 'What if the answer is no?',
          body: ['Sometimes it will be. A no to one idea is not a no to you. Here is what to do next.'],
          ordered: true,
          points: [
            { text: 'Stay calm.', more: 'Say, “Okay. Thanks for telling me.”' },
            { text: 'Ask what could work.', more: '“Is there something else we could try?”' },
            { text: 'Tell your job coach or teacher.', more: 'They can help you plan the next try.' }
          ],
          after: ['Trying again later, in a different way, is not being difficult. It is how problems get solved.']
        },
        {
          type: 'story',
          h: 'Try it: Sam and the three jobs',
          scene: [
            'Sam works at a grocery store. His supervisor walks by fast and says, “Face the cereal aisle, break down those boxes, then sweep aisle four.” Then she is gone.',
            'Sam caught the first one. He is not sure about the other two.'
          ],
          ask: 'What should Sam do?',
          choices: [
            {
              text: 'Do the cereal aisle, then guess at the rest.',
              good: false,
              result: 'Sam sweeps the wrong aisle and never breaks down the boxes. His supervisor thinks he did not listen.'
            },
            {
              text: 'Find her when she is free and say, “Do you have a minute? I got the cereal aisle, but I missed the rest. Can you tell me again so I can write it down?”',
              good: true,
              result: 'She says, “Sure,” and waits while Sam writes all three on a card. He finishes every job. That was all four steps: the moment, what is going on, what helps, and a question.'
            },
            {
              text: 'Shout across the store, “You went too fast!”',
              good: false,
              result: 'Customers turn and look. His supervisor is embarrassed and annoyed. Sam still does not know what the other two jobs were.'
            }
          ]
        },
        {
          type: 'story',
          h: 'Try it: Tasha and the helper',
          scene: [
            'Tasha is learning to make drinks at a cafe. Every time she starts one, her coworker Ben reaches over and finishes it for her.',
            'Ben is trying to be nice. But Tasha is not learning the drinks.'
          ],
          ask: 'What should Tasha say?',
          choices: [
            {
              text: 'Nothing. Ben means well.',
              good: false,
              result: 'Three weeks later, Tasha still cannot make the drinks alone. When Ben is out sick, she is stuck.'
            },
            {
              text: '“Stop grabbing my stuff!”',
              good: false,
              result: 'Ben is hurt and stops talking to her. Now Tasha has no one to ask when she does have a question.'
            },
            {
              text: '“Thanks, Ben. I would like to finish these myself so I can learn. Can you watch and tell me if I miss a step?”',
              good: true,
              result: 'Ben says, “Oh, sure.” He watches, and Tasha makes the next three drinks herself. She kept the friendship and got what she needed.'
            }
          ]
        },
        {
          type: 'pick', bank: 'moments', save: 'moment', count: 1, wide: true,
          h: 'Pick a moment that happens to you.',
          body: ['Choose the one you most want to be ready for. You will build what to say.'],
          ownHint: 'I ran out of supplies'
        },
        {
          type: 'pickfor', parent: 'moment', parentBank: 'moments', bank: 'asks', max: 1, wide: true,
          h: 'What will you ask?',
          chip: '{x}',
          body: ['Pick the question that would help most.'],
          ownLead: 'Can you', ownHint: 'check my work'
        },
        { type: 'q', n: 0 }, { type: 'q', n: 1 }, { type: 'q', n: 2 },
        { type: 'q', n: 3 }, { type: 'q', n: 4 }, { type: 'q', n: 5 },
        {
          type: 'build',
          h: 'This is what you will say.',
          body: ['It has all four steps. Read it out loud, or tap Listen.'],
          after: ['Saying it once out loud to a staff member makes the real one much easier.']
        },
        { type: 'done' }
      ],
      todo: [
        'Practice my words out loud with a staff member.',
        'Use them one time this week, at work or at school.',
        'Tell a staff member how it went.'
      ],
      card: {
        h: 'Four steps to speak up',
        ordered: true,
        items: ['Pick my moment. “Do you have a minute?”', 'Say what is going on. Start with “I.”', 'Say what would help.', 'Ask, then say thanks.']
      },
      quiz: [
        {
          skill: 'Telling the three ways apart',
          scene: 'Ben’s hours got cut, and nobody told him why. He says nothing, but he is angry all week.',
          ask: 'Which way is Ben responding?',
          choices: ['Staying quiet', 'Blowing up', 'Speaking up'],
          best: 0,
          why: 'Ben is staying quiet. The problem is still there, and the anger is building.'
        },
        {
          skill: 'Picking the moment',
          scene: 'Lin wants to ask her supervisor for a written list of her tasks.',
          ask: 'When is the best time?',
          choices: ['During the lunch rush, in front of customers', 'Never. It is not worth it.', 'When her supervisor is free: “Do you have a minute?”'],
          best: 2,
          why: 'A person who is free can actually listen. “Do you have a minute?” is a good way to start.'
        },
        {
          skill: 'Using “I” words',
          scene: 'A supervisor explains a new task very fast. Cory did not catch it.',
          ask: 'What is the best thing for Cory to say?',
          choices: ['“You talk way too fast.”', '“I missed some of that. Can you show me one more time?”', '“Got it.” (Cory did not get it.)'],
          best: 1,
          why: 'It starts with “I,” sticks to what happened, and ends with a clear question.'
        },
        {
          skill: 'Speaking for yourself',
          scene: 'A manager asks Omar a question about his schedule. Omar’s job coach starts to answer for him.',
          ask: 'What can Omar do?',
          choices: ['Say, “I would like to answer that myself.”', 'Let the job coach handle it.', 'Walk away.'],
          best: 0,
          why: 'A job coach helps you speak. They should not speak for you. It is okay to say so politely.'
        },
        {
          skill: 'Handling a no',
          scene: 'Priya asks to work in a quieter spot. Her supervisor says, “Sorry, there isn’t one.”',
          ask: 'What should Priya do next?',
          choices: ['Give up and never ask for anything again.', 'Tell the supervisor it is not fair and leave.', 'Ask, “Is there something else we could try? Could I wear earplugs?”'],
          best: 2,
          why: 'A no to one idea is not a no to you. Asking what else could work keeps the problem moving toward a fix.'
        },
        {
          skill: 'Waiting when upset',
          scene: 'Marco gets blamed for a mistake he did not make. He is very angry.',
          ask: 'What is the best first step?',
          choices: ['Tell the supervisor off right now.', 'Take a few minutes to calm down, then ask to talk.', 'Say nothing, ever.'],
          best: 1,
          why: 'Waiting a few minutes is not staying quiet. It is picking your moment so your words come out the way you want.'
        }
      ]
    },

    /* ================================================================
       LESSON 4
       ================================================================ */
    {
      id: 'l4',
      title: 'Speak up at your IEP',
      idea: 'It is your meeting. Your voice belongs in it.',
      recap: [
        {
          scene: 'Think back to Lesson 2. Eva is 20. Her family and teachers start planning her next year without asking her.',
          ask: 'What is true?',
          choices: ['It is their decision.', 'Eva has to wait until she is 22.', 'Eva is an adult. She has the right to be part of it.'],
          best: 2,
          why: 'At 18, the decisions about your school plan became yours.'
        },
        {
          scene: 'Think back to Lesson 3. There are four steps to speaking up.',
          ask: 'Which one is the last step?',
          choices: ['Say “You never listen to me.”', 'Ask a question, then say thanks.', 'Wait a few weeks.'],
          best: 1,
          why: 'Pick your moment, say what is going on, say what would help, then ask and say thanks.'
        }
      ],
      screens: [
        { type: 'q', set: 'recap', n: 0 }, { type: 'q', set: 'recap', n: 1 },
        {
          type: 'say',
          h: 'It is a meeting about your life.',
          body: [
            'Once a year, a group of adults sits down to talk about your goals and your support. That is your IEP meeting.',
            'A lot of students sit through it and say almost nothing. This lesson is about changing that, one step at a time.'
          ]
        },
        {
          type: 'say',
          h: 'What an IEP is.',
          body: ['IEP stands for Individualized Education Program. That is a long name for a simple idea: a written plan made just for you.'],
          points: [
            { icon: 'search', text: 'How things are going now', more: 'What you do well and what you are working on.' },
            { icon: 'target', text: 'Your goals for this year', more: 'What you will work on at TRACE.' },
            { icon: 'steps', text: 'Your goals for after TRACE', more: 'Work, more learning, and where and how you want to live.' },
            { icon: 'people', text: 'Your support', more: 'The help and services you get, and who gives them.' }
          ]
        },
        {
          type: 'say',
          h: 'The part about after TRACE is the heart of it.',
          body: [
            'At your age, the plan is supposed to point toward your adult life. That part is called transition planning.',
            'It should be built on what you want: the kind of job, the kind of training, the kind of life. The team cannot write that part well unless they hear it from you.'
          ],
          after: ['One study found that meetings often spend more time on school topics than on the future. You can be the one who brings it back to your goals.']
        },
        {
          type: 'say',
          h: 'Who is in the room.',
          body: ['It helps to know who everyone is before you walk in.'],
          points: [
            { icon: 'smile', text: 'You', more: 'The only person the whole meeting is about.' },
            { icon: 'page', text: 'Your teacher or case manager', more: 'They know your plan best and usually run the meeting.' },
            { icon: 'badge', text: 'Someone from the school district', more: 'They can approve services.' },
            { icon: 'heart', text: 'Family, or someone you trust', more: 'You can bring a person who supports you.' },
            { icon: 'people', text: 'Sometimes, an agency', more: 'Like the Department of Rehabilitation or the Regional Center. They are invited only if you say okay.' }
          ]
        },
        {
          type: 'say',
          h: 'What happens, in order.',
          body: ['Most meetings follow the same steps. Once you know them, there are no surprises.'],
          ordered: true,
          points: [
            { text: 'Introductions', more: 'Everyone says who they are.' },
            { text: 'How things are going', more: 'Your strengths, your progress, and what is hard.' },
            { text: 'Your goals', more: 'For this year and for after TRACE.' },
            { text: 'Your support', more: 'What help you will get to reach those goals.' },
            { text: 'Questions and signing', more: 'You can ask anything. You can also ask for time to read the plan before you sign it.' }
          ]
        },
        {
          type: 'say',
          h: 'Why so many students stay quiet.',
          body: [
            'Researchers looked into this. The main reason was not that students were shy, and not that they did not care.',
            'It was that nobody had shown them how the meeting works. The adults have been to hundreds of these. For the student, it is strange every time.',
            'You just read the steps. You already know more than most students do when they walk in.'
          ]
        },
        {
          type: 'say',
          h: 'Taking part is a ladder.',
          body: ['You do not have to run the whole meeting. Find where you are now, and take the next step up.'],
          ordered: true,
          points: [
            { text: 'Introduce yourself and say why you are all here.' },
            { text: 'Share your strengths and what helps you.' },
            { text: 'Say one goal you want.' },
            { text: 'Ask questions, and say so if you disagree.' },
            { text: 'Lead part of the meeting, or all of it.' }
          ],
          after: ['One step up at each meeting is real progress. Students who learn to take part get more of their own goals written into their plans.']
        },
        {
          type: 'say',
          h: 'Get ready before the meeting.',
          body: ['What you do before the meeting matters more than what you do in it.'],
          ordered: true,
          points: [
            { text: 'Find out when it is.', more: 'Ask your case manager for the date.' },
            { text: 'Know your three things.', more: 'What you are good at, what is hard, and what helps. That is Lesson 1.' },
            { text: 'Pick one goal you want to say.', more: 'Something you want for your life after TRACE.' },
            { text: 'Write it down.', more: 'Bring notes, or bring your Speak Up sheets.' },
            { text: 'Practice out loud.', more: 'Once with a staff member is enough to make it easier.' }
          ]
        },
        {
          type: 'say',
          h: 'Lines for hard moments.',
          body: ['Meetings can move fast. Keep these ready.'],
          pairs: {
            plain: true,
            left: 'When this happens',
            right: 'You can say',
            rows: [
              ['Someone uses a word you do not know.', '“Can you say that a different way?”'],
              ['People talk about you like you are not there.', '“I am right here. I would like to answer that.”'],
              ['Someone picks a goal you do not want.', '“That is not my goal. My goal is …”'],
              ['It is going too fast.', '“Can we slow down? I want to understand this.”']
            ]
          }
        },
        {
          type: 'say',
          h: 'You can disagree and still be respectful.',
          body: [
            'Disagreeing is not being rude. It is what the meeting is for.',
            'Use what you learned in Lesson 3. Stay calm, start with “I,” and say what you want.'
          ],
          points: [
            { icon: 'chat', text: '“I see it differently. Here is what I want.”' },
            { icon: 'chat', text: '“What would it take to make that happen?”' }
          ],
          after: ['You may not get everything you ask for. But the team has to listen, and what you say should be written into the plan.']
        },
        {
          type: 'story',
          h: 'Try it: Jay’s meeting',
          scene: [
            'Jay is sitting in his IEP meeting. Two adults are talking to each other. One says, “He does better with a lot of reminders.”',
            'They are talking about Jay as if he is not in the room.'
          ],
          ask: 'What should Jay do?',
          choices: [
            {
              text: 'Look at his phone until it is over.',
              good: false,
              result: 'The meeting ends. The plan says Jay needs constant reminders. Jay actually does fine with one alarm on his phone, but nobody heard that.'
            },
            {
              text: 'Say, “I am right here. I would like to answer that. One phone alarm works better for me than a lot of reminders.”',
              good: true,
              result: 'The room gets quiet, and then his teacher says, “Thank you, Jay. Let’s write that down.” The plan now says what really works for him.'
            },
            {
              text: 'Push his chair back and say, “This is pointless.”',
              good: false,
              result: 'Everyone focuses on calming Jay down. Nobody finds out what he wanted to say about reminders.'
            }
          ]
        },
        {
          type: 'story',
          h: 'Try it: Nina’s goal',
          scene: [
            'In Nina’s meeting, a team member says, “Let’s write a goal about cleaning jobs. There are a lot of those.”',
            'Nina does not want a cleaning job. She wants to work with animals.'
          ],
          ask: 'What should Nina say?',
          choices: [
            {
              text: '“Okay.”',
              good: false,
              result: 'The goal gets written. Nina spends the year training for a job she does not want.'
            },
            {
              text: '“That is not my goal. I want to work with animals. What would it take to try that?”',
              good: true,
              result: 'The team talks about a volunteer spot at an animal shelter. Nina’s plan now has her goal in it, in her words.'
            },
            {
              text: 'Say nothing, then tell her mom later that the meeting was unfair.',
              good: false,
              result: 'Her mom is upset too, but the plan is already written. It is much harder to change it after the meeting than during it.'
            }
          ]
        },
        {
          type: 'pick', bank: 'ladder', count: 1, wide: true,
          h: 'What is your next step up?',
          body: ['Pick the one you will do at your next meeting. Just one.']
        },
        {
          type: 'pick', bank: 'goals', save: 'goal', count: 1,
          h: 'What do you want after TRACE?',
          body: ['Pick the goal you most want your team to hear.'],
          ownLead: 'I want to', ownHint: 'work with animals'
        },
        {
          type: 'pick', bank: 'helps', save: 'iephelps', min: 1, max: 2,
          h: 'What helps you do your best?',
          body: ['Pick 1 or 2. Your team should hear this from you.'],
          ownLead: 'It helps when', ownHint: 'I can sit down'
        },
        { type: 'q', n: 0 }, { type: 'q', n: 1 }, { type: 'q', n: 2 },
        { type: 'q', n: 3 }, { type: 'q', n: 4 }, { type: 'q', n: 5 },
        {
          type: 'build',
          h: 'This is how you can open your meeting.',
          body: ['Read it out loud, or tap Listen.'],
          after: ['Bring this sheet to your meeting. It is fine to read from it.']
        },
        {
          type: 'checkin',
          when: 'after',
          h: 'Last thing: the same check as the start.',
          body: ['You answered these before Lesson 1. Pick what is true for you now.']
        },
        { type: 'done' }
      ],
      todoTitle: 'Before my next meeting',
      todo: [
        'Ask my case manager: “When is my next IEP meeting?”',
        'Bring this sheet to the meeting.'
      ],
      card: {
        h: 'Lines for hard moments',
        items: ['“Can you say that a different way?”', '“I am right here. I would like to answer that.”', '“That is not my goal. My goal is …”', '“Can we slow down? I want to understand this.”']
      },
      quiz: [
        {
          skill: 'Knowing whose meeting it is',
          scene: 'Dana is 20. She thinks the IEP meeting is for teachers and parents, so she plans to sit quietly.',
          ask: 'What is true?',
          choices: ['It is Dana’s plan. Her voice belongs in the meeting.', 'Dana is right. It is their meeting.', 'Students are not allowed to talk.'],
          best: 0,
          why: 'The whole meeting is about Dana’s life. She is the most important person in the room.'
        },
        {
          skill: 'Asking when confused',
          scene: 'A team member says “present levels of performance.” Eli has no idea what that means.',
          ask: 'What should Eli do?',
          choices: ['Nod like he understands.', 'Say, “Can you say that a different way?”', 'Stop listening.'],
          best: 1,
          why: 'You have the right to understand your own plan. Asking is how you get there.'
        },
        {
          skill: 'Choosing a next step',
          scene: 'Rae has never said anything in her IEP meeting. She wants to take part this year.',
          ask: 'What is a good next step?',
          choices: ['Run the whole meeting by herself.', 'Skip the meeting.', 'Introduce herself and share one strength.'],
          best: 2,
          why: 'Taking part is a ladder. One step up from where you are is real progress.'
        },
        {
          skill: 'Disagreeing respectfully',
          scene: 'The team starts writing a goal for a job Tony does not want. He wants to work on cars.',
          ask: 'What should Tony say?',
          choices: ['“Fine, whatever.”', '“That is not my goal. I want to work on cars.”', '“You people never listen!”'],
          best: 1,
          why: 'It is calm, it starts with what Tony wants, and it gives the team something to write down.'
        },
        {
          skill: 'Getting ready',
          scene: 'Lupe’s IEP meeting is next week.',
          ask: 'What is the best way to get ready?',
          choices: ['Do nothing and see what happens.', 'Let her mom handle it.', 'Write down her strengths, what helps, and one goal, then practice out loud.'],
          best: 2,
          why: 'What you do before the meeting matters most. Notes and one practice run make speaking up much easier.'
        },
        {
          skill: 'Understanding before signing',
          scene: 'At the end, Sol is handed the plan to sign. There is a part he does not understand.',
          ask: 'What can Sol do?',
          choices: ['Ask questions, or ask for time to read it first.', 'Sign it fast so the meeting can end.', 'Refuse to ever sign anything.'],
          best: 0,
          why: 'It is your plan. You can ask about any part of it, and you can ask for time before you sign.'
        }
      ]
    }
  ]
};
