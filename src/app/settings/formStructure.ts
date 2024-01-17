export const countries = [
  'Afghanistan',
  'Albania',
  'Algeria',
  'Andorra',
  'Angola',
  'Antigua & Deps',
  'Argentina',
  'Armenia',
  'Australia',
  'Austria',
  'Azerbaijan',
  'Bahamas',
  'Bahrain',
  'Bangladesh',
  'Barbados',
  'Belarus',
  'Belgium',
  'Belize',
  'Benin',
  'Bhutan',
  'Bolivia',
  'Bosnia Herzegovina',
  'Botswana',
  'Brazil',
  'Brunei',
  'Bulgaria',
  'Burkina',
  'Burundi',
  'Cambodia',
  'Cameroon',
  'Canada',
  'Cape Verde',
  'Central African Rep',
  'Chad',
  'Chile',
  'China',
  'Colombia',
  'Comoros',
  'Congo',
  'Congo {Democratic Rep}',
  'Costa Rica',
  'Croatia',
  'Cuba',
  'Cyprus',
  'Czech Republic',
  'Denmark',
  'Djibouti',
  'Dominica',
  'Dominican Republic',
  'East Timor',
  'Ecuador',
  'Egypt',
  'El Salvador',
  'Equatorial Guinea',
  'Eritrea',
  'Estonia',
  'Ethiopia',
  'Fiji',
  'Finland',
  'France',
  'Gabon',
  'Gambia',
  'Georgia',
  'Germany',
  'Ghana',
  'Greece',
  'Grenada',
  'Guatemala',
  'Guinea',
  'Guinea-Bissau',
  'Guyana',
  'Haiti',
  'Honduras',
  'Hungary',
  'Iceland',
  'India',
  'Indonesia',
  'Iran',
  'Iraq',
  'Ireland {Republic}',
  'Italy',
  'Ivory Coast',
  'Jamaica',
  'Japan',
  'Jordan',
  'Kazakhstan',
  'Kashmir',
  'Kenya',
  'Kiribati',
  'Korea North',
  'Korea South',
  'Kosovo',
  'Kurdistan',
  'Kuwait',
  'Kyrgyzstan',
  'Laos',
  'Latvia',
  'Lebanon',
  'Lesotho',
  'Liberia',
  'Libya',
  'Liechtenstein',
  'Lithuania',
  'Luxembourg',
  'Macedonia',
  'Madagascar',
  'Malawi',
  'Malaysia',
  'Maldives',
  'Mali',
  'Malta',
  'Marshall Islands',
  'Mauritania',
  'Mauritius',
  'Mexico',
  'Micronesia',
  'Moldova',
  'Monaco',
  'Mongolia',
  'Montenegro',
  'Morocco',
  'Mozambique',
  'Myanmar, {Burma}',
  'Namibia',
  'Nauru',
  'Nepal',
  'Netherlands',
  'New Zealand',
  'Nicaragua',
  'Niger',
  'Nigeria',
  'Norway',
  'Oman',
  'Pakistan',
  'Palau',
  'Palestine',
  'Panama',
  'Papua New Guinea',
  'Paraguay',
  'Peru',
  'Philippines',
  'Poland',
  'Portugal',
  'Qatar',
  'Romania',
  'Russian Federation',
  'Rwanda',
  'St Kitts & Nevis',
  'St Lucia',
  'Saint Vincent & the Grenadines',
  'Samoa',
  'San Marino',
  'Sao Tome & Principe',
  'Saudi Arabia',
  'Senegal',
  'Serbia',
  'Seychelles',
  'Sierra Leone',
  'Singapore',
  'Slovakia',
  'Slovenia',
  'Solomon Islands',
  'Somalia',
  'South Africa',
  'South Sudan',
  'Spain',
  'Sri Lanka',
  'Sudan',
  'Suriname',
  'Swaziland',
  'Sweden',
  'Switzerland',
  'Syria',
  'Taiwan',
  'Tajikistan',
  'Tanzania',
  'Thailand',
  'Togo',
  'Tonga',
  'Trinidad & Tobago',
  'Tunisia',
  'Turkey',
  'Turkmenistan',
  'Tuvalu',
  'Uganda',
  'Ukraine',
  'United Arab Emirates',
  'United Kingdom',
  'United States',
  'Uruguay',
  'Uzbekistan',
  'Vanuatu',
  'Vatican City',
  'Venezuela',
  'Vietnam',
  'Yemen',
  'Zambia',
  'Zimbabwe'
]

export const states = [
  'Outside the US (literally any other country)',
  'Alabama',
  'Alaska',
  'Arizona',
  'Arkansas',
  'California',
  'Colorado',
  'Connecticut',
  'Delaware',
  'District of Columbia',
  'Florida',
  'Georgia',
  'Hawaii',
  'Idaho',
  'Illinois',
  'Indiana',
  'Iowa',
  'Kansas',
  'Kentucky',
  'Louisiana',
  'Maine',
  'Maryland',
  'Massachusetts',
  'Michigan',
  'Minnesota',
  'Mississippi',
  'Missouri',
  'Montana',
  'Nebraska',
  'Nevada',
  'New Hampshire',
  'New Jersey',
  'New Mexico',
  'New York',
  'North Carolina',
  'North Dakota',
  'Ohio',
  'Oklahoma',
  'Oregon',
  'Pennsylvania',
  'Rhode Island',
  'South Carolina',
  'South Dakota',
  'Tennessee',
  'Texas',
  'Utah',
  'Vermont',
  'Virginia',
  'Washington',
  'West Virginia',
  'Wisconsin',
  'Wyoming'
]

export const formStructure = [
  {
    question_key: 'JK56ri09Proe',
    title: "What's your *first name*?",
    type: 'short_text',
    required: true,
    shouldBeAnswered(
      form: Record<string, { question_key: string; answer: string }>
    ) {
      return true
    }
  },
  {
    question_key: 'VkRio3inIPOS',
    title: '...and your *last name*?',
    type: 'short_text',
    required: true,
    shouldBeAnswered(
      form: Record<string, { question_key: string; answer: string }>
    ) {
      return true
    }
  },
  {
    question_key: 'ooQtpzRypFRM',
    title: "What's *your phone number*?",
    title_old:
      "Ok {{field:a9e22065-f360-4b93-8ae4-1a4086e05626}}, what's *your phone number*?",
    type: 'phone_number',
    required: true,
    readOnly: true,
    shouldBeAnswered(
      form: Record<string, { question_key: string; answer: string }>
    ) {
      return true
    }
  },
  {
    question_key: '43MXs1b9JomM',
    title: "What's your *email address?*",
    title_old: "First off, what's your *email address?*",
    type: 'email',
    required: true,
    readOnly: true,
    shouldBeAnswered(
      form: Record<string, { question_key: string; answer: string }>
    ) {
      return true
    }
  },
  {
    question_key: 'fWOABv0TcPf6',
    title: "What's your *IG handle*?",
    type: 'short_text',
    required: true,
    shouldBeAnswered(
      form: Record<string, { question_key: string; answer: string }>
    ) {
      return true
    }
  },
  {
    question_key: 'tn75DoPDJ5jX',
    title: "What's your *gender*?",
    type: 'dropdown',
    required: true,
    choices: ['Female', 'Male'],
    shouldBeAnswered(
      form: Record<string, { question_key: string; answer: string }>
    ) {
      return true
    }
  },
  {
    question_key: '79nGG0bKAw4Y',
    title: 'Were you *referred* by somebody else?',
    type: 'yes_no',
    required: true,
    readOnly: true,
    shouldBeAnswered(
      form: Record<string, { question_key: string; answer: string }>
    ) {
      return form['tn75DoPDJ5jX']?.answer === 'Male'
    }
  },
  {
    question_key: '908DOP6X97tl',
    title: "What's *their* phone number?",
    type: 'phone_number',
    required: true,
    readOnly: true,
    shouldBeAnswered(
      form: Record<string, { question_key: string; answer: string }>
    ) {
      return form['79nGG0bKAw4Y']?.answer === 'true'
    }
  },
  {
    question_key: '2Kpbvgx904l0',
    title: "What's your *date of birth*?",
    type: 'date',
    required: true,
    shouldBeAnswered(
      form: Record<string, { question_key: string; answer: string }>
    ) {
      return true
    }
  },
  {
    question_key: 'PxmJ4G5wtMHN',
    title: 'How tall are you?',
    type: 'dropdown',
    required: true,
    choices: [
      "4'9-",
      "4'10",
      "4'11",
      "5'0",
      "5'1",
      "5'2",
      "5'3",
      "5'4",
      "5'5",
      "5'6",
      "5'7",
      "5'8",
      "5'9",
      "5'10",
      "5'11",
      "6'0",
      "6'1",
      "6'2",
      "6'3",
      "6'4+"
    ],
    shouldBeAnswered(
      form: Record<string, { question_key: string; answer: string }>
    ) {
      return true
    }
  },
  {
    question_key: 'qbpbmoyhfSih',
    title: 'Are you *currently* a *student*?',
    type: 'yes_no',
    required: true,
    shouldBeAnswered(
      form: Record<string, { question_key: string; answer: string }>
    ) {
      return true
    }
  },
  {
    question_key: 'X85hQblx3Pmh',
    title: 'What kind of *education* are you pursuing?',
    type: 'dropdown',
    required: true,
    choices: [
      'Undergraduate Degree',
      'Masters Degree',
      'PhD',
      '4 year Medical Degree (MD/DO)',
      '4 year Professional Graduate Degree (PharmD, etc.)(Not MD/DO)',
      'JD',
      'Advanced Islamic Degree'
    ],
    shouldBeAnswered(
      form: Record<string, { question_key: string; answer: string }>
    ) {
      return form['qbpbmoyhfSih']?.answer === 'true'
    }
  },
  {
    question_key: 'VVXcA4DW88BM',
    title: 'How much *education* have you finished?',
    type: 'dropdown',
    required: true,
    choices: [
      'Undergraduate Degree',
      'Masters Degree',
      'PhD',
      '4 year Medical Degree (MD/DO)',
      '4 year Professional Graduate Degree (PharmD, etc.)(Not MD/DO)',
      'JD',
      'Advanced Islamic Degree'
    ],
    shouldBeAnswered(
      form: Record<string, { question_key: string; answer: string }>
    ) {
      return true
    }
  },
  {
    question_key: '3O6WVdWAyzDj',
    title:
      "What do you *do for work*? If you're a student, what do you currently study?",
    type: 'short_text',
    required: true,
    shouldBeAnswered(
      form: Record<string, { question_key: string; answer: string }>
    ) {
      return true
    }
  },
  {
    question_key: 'iq5KEcaJicfQ',
    title: 'What *languages* do you speak?',
    type: 'short_text',
    required: true,
    shouldBeAnswered(
      form: Record<string, { question_key: string; answer: string }>
    ) {
      return true
    }
  },
  {
    question_key: 'KJKKfm7xXg8o',
    title: 'Do you have *more than one ethnic background*?',
    type: 'yes_no',
    required: true,
    shouldBeAnswered(
      form: Record<string, { question_key: string; answer: string }>
    ) {
      return true
    }
  },
  {
    question_key: '1N8PsgWkZNiR',
    title: 'Where you from?',
    type: 'dropdown',
    required: true,
    choices: countries,
    shouldBeAnswered(
      form: Record<string, { question_key: string; answer: string }>
    ) {
      return form['KJKKfm7xXg8o']?.answer === 'false'
    }
  },
  {
    question_key: 'PII0G2xjkg6o',
    title: 'Where is your dad from?',
    type: 'dropdown',
    required: true,
    choices: countries,
    shouldBeAnswered(
      form: Record<string, { question_key: string; answer: string }>
    ) {
      return form['KJKKfm7xXg8o']?.answer === 'true'
    }
  },
  {
    question_key: '1bpJ7EyOQzWI',
    title: 'Where is your mom from?',
    type: 'dropdown',
    required: true,
    choices: countries,
    shouldBeAnswered(
      form: Record<string, { question_key: string; answer: string }>
    ) {
      return form['KJKKfm7xXg8o']?.answer === 'true'
    }
  },
  {
    question_key: 'HUJ3mvfXsC2K',
    title: 'What *sect* are you?',
    type: 'multiple_choice',
    required: true,
    choices: ['Sunni', 'Shia', 'Revert', 'Other'],
    shouldBeAnswered(
      form: Record<string, { question_key: string; answer: string }>
    ) {
      return true
    }
  },
  {
    question_key: 'VBCNpvMo7VH7',
    title: 'Which state did you spend *most of your life* in?',
    type: 'dropdown',
    required: true,
    choices: states,
    shouldBeAnswered(
      form: Record<string, { question_key: string; answer: string }>
    ) {
      return true
    }
  },
  {
    question_key: 'p2T9t24rQRJI',
    title: 'Which country?',
    type: 'dropdown',
    required: true,
    choices: countries,
    shouldBeAnswered(
      form: Record<string, { question_key: string; answer: string }>
    ) {
      return (
        form['VBCNpvMo7VH7']?.answer ===
        'Outside the US (literally any other country)'
      )
    }
  },
  {
    question_key: 'nLH2f4kMpbQ1',
    title: 'Which state do you *live in right now*? ',
    type: 'dropdown',
    required: true,
    choices: states,
    shouldBeAnswered(
      form: Record<string, { question_key: string; answer: string }>
    ) {
      return true
    }
  },
  {
    question_key: '5x4AP7uIVl0I',
    title: 'Which country?',
    type: 'dropdown',
    required: true,
    choices: countries,
    shouldBeAnswered(
      form: Record<string, { question_key: string; answer: string }>
    ) {
      return (
        form['nLH2f4kMpbQ1']?.answer ===
        'Outside the US (literally any other country)'
      )
    }
  },
  {
    question_key: 'uHdHmlJkDsbv',
    title: 'How long will you be there for?',
    type: 'short_text',
    required: true,
    shouldBeAnswered(
      form: Record<string, { question_key: string; answer: string }>
    ) {
      return (
        form['nLH2f4kMpbQ1']?.answer ===
        'Outside the US (literally any other country)'
      )
    }
  },
  {
    question_key: 'XGmnrvGopqd3',
    title: 'Which *city* do you spend most of your time in now?',
    type: 'short_text',
    required: true,
    shouldBeAnswered(
      form: Record<string, { question_key: string; answer: string }>
    ) {
      return true
    }
  },
  {
    question_key: 'pxwYLnIRvq4U',
    title: 'Have you ever been *married*?',
    type: 'yes_no',
    required: true,
    shouldBeAnswered(
      form: Record<string, { question_key: string; answer: string }>
    ) {
      return true
    }
  },
  {
    question_key: 'Gq4Oo3w5RVYs',
    title: 'Do you have *kids*?',
    type: 'yes_no',
    required: true,
    shouldBeAnswered(
      form: Record<string, { question_key: string; answer: string }>
    ) {
      return form['pxwYLnIRvq4U']?.answer === 'true'
    }
  },
  {
    question_key: 'qwEjeGkC7U0k',
    title: 'How many times do you *pray* per day on average?',
    type: 'opinion_scale',
    required: true,
    choices: [0, 1, 2, 3, 4, 5],
    shouldBeAnswered(
      form: Record<string, { question_key: string; answer: string }>
    ) {
      return true
    }
  },
  {
    question_key: '67K3axbA0iIN',
    title:
      'How many times have you *been to the* *masjid* this month (actually, not for a sneaky link)?',
    type: 'opinion_scale',
    required: true,
    choices: [0, 1, 2, 3, 4, 5],
    shouldBeAnswered(
      form: Record<string, { question_key: string; answer: string }>
    ) {
      return true
    }
  },
  {
    question_key: 'ZdRihUFclCTF',
    title:
      "Be honest, how likely is it that you're going to wake up your mans/womans for *Fajr*?",
    type: 'opinion_scale',
    required: true,
    choices: [1, 2, 3, 4, 5],
    left: 'lol',
    right: 'Every day',
    shouldBeAnswered(
      form: Record<string, { question_key: string; answer: string }>
    ) {
      return true
    }
  },
  {
    question_key: '2Nkmie53XuMB',
    title:
      '*How many hours* of Islamic content do you digest on average per month (articles, lectures, halaqas, etc.)?',
    type: 'opinion_scale',
    required: true,
    choices: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    shouldBeAnswered(
      form: Record<string, { question_key: string; answer: string }>
    ) {
      return true
    }
  },
  {
    question_key: 'NxUSUsBqUopa',
    title: 'How important is Islam in your *day-to-day* life?',
    type: 'opinion_scale',
    required: true,
    choices: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    left: 'Not important at all',
    right: 'Very very important',
    shouldBeAnswered(
      form: Record<string, { question_key: string; answer: string }>
    ) {
      return true
    }
  },
  {
    question_key: 'LgFkCbihHNth',
    title: 'Have you ever owned a *miswak*? ',
    type: 'yes_no',
    required: true,
    shouldBeAnswered(
      form: Record<string, { question_key: string; answer: string }>
    ) {
      return true
    }
  },
  {
    question_key: 'qJYP9Z7x3ZxL',
    title: 'Do you currently wear the *hijab*?',
    type: 'yes_no',
    required: true,
    shouldBeAnswered(
      form: Record<string, { question_key: string; answer: string }>
    ) {
      return form['tn75DoPDJ5jX']?.answer === 'Female'
    }
  },
  {
    question_key: 'pldCMQxTrgrC',
    title: 'Are you *career oriented* or *family oriented*?',
    type: 'opinion_scale',
    required: true,
    choices: [1, 2, 3, 4, 5],
    left: 'Mostly career oriented',
    center: 'Neutral',
    right: 'Mostly family oriented',
    shouldBeAnswered(
      form: Record<string, { question_key: string; answer: string }>
    ) {
      return true
    }
  },
  {
    question_key: 'Fs4XKZzOhn7J',
    title: 'How *financially independent *are you?',
    type: 'opinion_scale',
    required: true,
    choices: [1, 2, 3, 4, 5],
    left: "I don't have an income",
    right: 'I pay all my expenses',
    shouldBeAnswered(
      form: Record<string, { question_key: string; answer: string }>
    ) {
      return true
    }
  },
  {
    question_key: 'zhX81eJHmc9A',
    title: 'How *fit* would you describe yourself. ',
    type: 'opinion_scale',
    required: true,
    choices: [1, 2, 3, 4, 5],
    left: 'I am a hermit',
    right: 'I have worked out at 6am',
    shouldBeAnswered(
      form: Record<string, { question_key: string; answer: string }>
    ) {
      return true
    }
  },
  {
    question_key: 'Gf1a3QaPQvmS',
    title: 'How *close* are you to your family?',
    type: 'opinion_scale',
    required: true,
    choices: [1, 2, 3, 4, 5, 6, 7],
    left: 'Not at all really',
    right: 'Very very close!',
    shouldBeAnswered(
      form: Record<string, { question_key: string; answer: string }>
    ) {
      return true
    }
  },
  {
    question_key: 'OHCz44TDTISi',
    title: "Do you currently smoke [*the devil's* lettuce]?",
    type: 'yes_no',
    required: true,
    shouldBeAnswered(
      form: Record<string, { question_key: string; answer: string }>
    ) {
      return true
    }
  },
  {
    question_key: 'TiT2IeTzmmnD',
    title: 'Do you currently drink *alcohol*?',
    type: 'yes_no',
    required: true,
    shouldBeAnswered(
      form: Record<string, { question_key: string; answer: string }>
    ) {
      return true
    }
  },
  {
    question_key: 'IZZ9zqez2XfX',
    title: 'Do you currently do "*it*".',
    type: 'yes_no',
    required: true,
    shouldBeAnswered(
      form: Record<string, { question_key: string; answer: string }>
    ) {
      return true
    }
  },
  {
    question_key: 'cehUKQDriDHo',
    title:
      'First, we have to ask your age preferences. What is the *oldest age *you* *are you comfortable with?',
    type: 'number',
    required: true,
    validations: {
      min_value: 18,
      max_value: 99
    },
    shouldBeAnswered(
      form: Record<string, { question_key: string; answer: string }>
    ) {
      return true
    }
  },
  {
    question_key: 'hnH09VfI4KVS',
    title: 'What is the *youngest age *are you comfortable with?',
    type: 'number',
    required: true,
    validations: {
      min_value: 18,
      max_value: 99
    },
    shouldBeAnswered(
      form: Record<string, { question_key: string; answer: string }>
    ) {
      return true
    }
  },
  {
    question_key: '4Rkw1WITJJ3z',
    title: 'I would prefer my partner to be...',
    type: 'dropdown',
    required: true,
    choices: [
      "Shorter than 5'0",
      "Taller than 5'0",
      "Shorter than 5'2",
      "Taller than 5'2",
      "Shorter than 5'4",
      "Taller than 5'4",
      "Shorter than 5'6",
      "Taller than 5'6",
      "Shorter than 5'8",
      "Taller than 5'8",
      "Shorter than 5'10",
      "Taller than 5'10",
      "Shorter than 6'",
      "Taller than 6'0",
      "Shorter than 6'2",
      "Taller than 6'2"
    ],
    shouldBeAnswered(
      form: Record<string, { question_key: string; answer: string }>
    ) {
      return true
    }
  },
  {
    question_key: 'Nsr4OO6zQpMs',
    title: 'Are you open to a *student*?',
    type: 'yes_no',
    required: true,
    shouldBeAnswered(
      form: Record<string, { question_key: string; answer: string }>
    ) {
      return true
    }
  },
  {
    question_key: '3jBkxs3J0jaM',
    title: 'How much *education* should they have finished?',
    type: 'multiple_choice',
    required: true,
    choices: [
      'Undergraduate Degree',
      'Masters Degree',
      'PhD',
      '4 year Professional Graduate Degree (MD, DO, PharmD, etc.)',
      'JD',
      'Advanced Islamic Degree'
    ],
    shouldBeAnswered(
      form: Record<string, { question_key: string; answer: string }>
    ) {
      return form['Nsr4OO6zQpMs']?.answer === 'false'
    }
  },
  {
    question_key: '21AlrTSRUytC',
    title: 'If they are a student, what kind of *education* are they in?',
    type: 'multiple_choice',
    required: true,
    choices: [
      'Undergraduate Degree',
      'Masters Degree',
      'PhD',
      '4 year Professional Graduate Degree (MD, DO, PharmD, etc.)',
      'JD',
      'Advanced Islamic Degree'
    ],
    shouldBeAnswered(
      form: Record<string, { question_key: string; answer: string }>
    ) {
      return form['Nsr4OO6zQpMs']?.answer === 'true'
    }
  },
  {
    question_key: 'gsHh5eDZgixv',
    title: 'What *languages* should *they* speak?',
    type: 'short_text',
    required: true,
    shouldBeAnswered(
      form: Record<string, { question_key: string; answer: string }>
    ) {
      return true
    }
  },
  {
    question_key: 'SzMkh0Qj5XS4',
    title: 'Do you only want somebody from *your* *specific background*? ',
    type: 'yes_no',
    required: true,
    shouldBeAnswered(
      form: Record<string, { question_key: string; answer: string }>
    ) {
      return true
    }
  },
  {
    question_key: 'G6R7CNLJXWrI',
    title:
      'How much of a preference do you have for *your specific background*?',
    type: 'opinion_scale',
    required: true,
    choices: [1, 2, 3, 4, 5],
    left: 'No preference at all',
    right: 'I will die if we are dif',
    shouldBeAnswered(
      form: Record<string, { question_key: string; answer: string }>
    ) {
      return form['SzMkh0Qj5XS4']?.answer === 'false'
    }
  },
  {
    question_key: 'E4veMhWjBe6O',
    title: 'Which *ethnic/cultural backgrounds* are you open to?',
    type: 'multiple_choice',
    required: true,
    choices: [
      'African',
      'African American',
      'Asian',
      'Desi',
      'Eastern European',
      'Hispanic/Latino',
      'Middle Eastern',
      'North African',
      'Persian',
      'Shamy',
      'White',
      '*Everything, just make them nice *'
    ],
    shouldBeAnswered(
      form: Record<string, { question_key: string; answer: string }>
    ) {
      return form['SzMkh0Qj5XS4']?.answer === 'false'
    }
  },
  {
    question_key: 'vipahU27MPiv',
    title: '*What kind of Desi?*',
    type: 'multiple_choice',
    required: true,
    choices: ['Pakistani', 'Indian', 'Bengali'],
    shouldBeAnswered(
      form: Record<string, { question_key: string; answer: string }>
    ) {
      return JSON.parse(form['E4veMhWjBe6O']?.answer || '[]').includes('Desi')
    }
  },
  {
    question_key: 'wxwOGb9MdZcR',
    title: '*What kind of Shamy?*',
    type: 'multiple_choice',
    required: true,
    choices: ['Palestinian', 'Jordanian', 'Syrian', 'Lebanese'],
    shouldBeAnswered(
      form: Record<string, { question_key: string; answer: string }>
    ) {
      return JSON.parse(form['E4veMhWjBe6O']?.answer || '[]').includes('Shamy')
    }
  },
  {
    question_key: 'EbsmmNcCRk10',
    title: 'Do you have any *regional preferences*?',
    type: 'yes_no',
    required: true,
    shouldBeAnswered(
      form: Record<string, { question_key: string; answer: string }>
    ) {
      return true
    }
  },
  {
    question_key: 'JKKXRC3hHlAA',
    title: 'Which regions are you open to getting to know somebody in?',
    type: 'picture_choice',
    required: true,
    choices: [
      'Pacific Coastal',
      'Rocky Mountains',
      'Midwest',
      'Southwest',
      'Southeast',
      'Mid-Atlantic',
      'New England',
      'Canada'
    ],
    shouldBeAnswered(
      form: Record<string, { question_key: string; answer: string }>
    ) {
      return form['EbsmmNcCRk10']?.answer === 'true'
    }
  },
  {
    question_key: 'fSAgiNElvKze',
    title: 'Are you *willing to move*?',
    type: 'multiple_choice',
    required: true,
    choices: ['Yes', 'No', 'In the future'],
    shouldBeAnswered(
      form: Record<string, { question_key: string; answer: string }>
    ) {
      return true
    }
  },
  {
    question_key: 'yB8yMZEuAWYS',
    title: 'Do you care what *sect* your partner is?',
    type: 'yes_no',
    required: true,
    shouldBeAnswered(
      form: Record<string, { question_key: string; answer: string }>
    ) {
      return true
    }
  },
  {
    question_key: 'sV6Ei6VYqsIv',
    title:
      'Men, do you *want* your girl to be a *full-time* stay-at-home wife?',
    type: 'multiple_choice',
    required: true,
    choices: ['Yes', 'No', 'Either way works for me'],
    shouldBeAnswered(
      form: Record<string, { question_key: string; answer: string }>
    ) {
      return form['tn75DoPDJ5jX']?.answer === 'Male'
    }
  },
  {
    question_key: 'xgHm9tZjOkgb',
    title: 'Do you *expect* your girl to be a *full-time* stay-at-home wife?',
    type: 'yes_no',
    required: true,
    shouldBeAnswered(
      form: Record<string, { question_key: string; answer: string }>
    ) {
      return form['sV6Ei6VYqsIv']?.answer === 'true'
    }
  },
  {
    question_key: 'U03aQUWllnaF',
    title: 'How important is it to you that your future girl wears *hijab*?',
    type: 'opinion_scale',
    required: true,
    choices: [1, 2, 3, 4, 5],
    left: 'Not a big deal',
    right: 'Very important',
    shouldBeAnswered(
      form: Record<string, { question_key: string; answer: string }>
    ) {
      return form['tn75DoPDJ5jX']?.answer === 'Male'
    }
  },
  {
    question_key: 'GM5mWUV1BC1c',
    title:
      'For the women, do you *want* to be a *full-time* stay-at-home wife at any point?',
    type: 'yes_no',
    required: true,
    shouldBeAnswered(
      form: Record<string, { question_key: string; answer: string }>
    ) {
      return form['tn75DoPDJ5jX']?.answer === 'Female'
    }
  },
  {
    question_key: 'Wvj6R5lNgjAu',
    title: 'Do you want to be a *full-time *stay-at-home wife *indefinitely*?',
    type: 'yes_no',
    required: false,
    shouldBeAnswered(
      form: Record<string, { question_key: string; answer: string }>
    ) {
      return form['GM5mWUV1BC1c']?.answer === 'true'
    }
  },
  {
    question_key: 'mInJk9geJAAf',
    title: 'Feel free to *elaborate* your previous answer here.',
    type: 'short_text',
    required: false,
    shouldBeAnswered(
      form: Record<string, { question_key: string; answer: string }>
    ) {
      return form['tn75DoPDJ5jX']?.answer === 'Female'
    }
  },
  {
    question_key: 'EoZz7tssQtp5',
    title:
      'How important is it to you that your future mans *cares* that you *wear hijab*?',
    type: 'opinion_scale',
    required: true,
    choices: [1, 2, 3, 4, 5],
    left: 'Not a big deal',
    right: 'Very important',
    shouldBeAnswered(
      form: Record<string, { question_key: string; answer: string }>
    ) {
      return form['tn75DoPDJ5jX']?.answer === 'Female'
    }
  },
  {
    question_key: 'z0DkAFIUdL6w',
    title:
      'How important to you is it that your future partner is *close with their family*?',
    type: 'opinion_scale',
    required: true,
    choices: [1, 2, 3, 4, 5, 6, 7],
    left: 'Not that deep',
    right: 'They need to be!',
    shouldBeAnswered(
      form: Record<string, { question_key: string; answer: string }>
    ) {
      return true
    }
  },
  {
    question_key: 'vECo7GNWkjhG',
    title: 'Would a medical student or physician *be a dealbreaker* for you?',
    type: 'yes_no',
    required: true,
    shouldBeAnswered(
      form: Record<string, { question_key: string; answer: string }>
    ) {
      return true
    }
  },
  {
    question_key: 'TF5hQ2ZeyRa1',
    title: 'What is your "*type*"?',
    type: 'long_text',
    required: true,
    shouldBeAnswered(
      form: Record<string, { question_key: string; answer: string }>
    ) {
      return true
    }
  },
  {
    question_key: 'MicoANSoyslB',
    title:
      "Out of everything you're looking for, rank what is *most important to you*. ",
    type: 'ranking',
    required: true,
    choices: [
      'Same Culture',
      'Education',
      'Financial Stability',
      'Deen',
      'Intelligence',
      'Regional Preference',
      'Physical Attraction'
    ],
    shouldBeAnswered(
      form: Record<string, { question_key: string; answer: string }>
    ) {
      return true
    }
  },
  {
    question_key: '1zDD4flwBRna',
    title: 'What are your absolute *deal breakers*?',
    type: 'multiple_choice',
    required: true,
    choices: [
      'Drinking',
      'Smoking [Weed]',
      'Actively has sex in their relationships',
      'Previously married',
      'Has children',
      'Does not pray',
      'Revert/Convert'
    ],
    shouldBeAnswered(
      form: Record<string, { question_key: string; answer: string }>
    ) {
      return true
    }
  },
  {
    question_key: 'mJ1PYTL46hLV',
    title: '*What else* are you looking for in a partner?',
    type: 'long_text',
    required: true,
    shouldBeAnswered(
      form: Record<string, { question_key: string; answer: string }>
    ) {
      return true
    }
  }
] as const

// const j = Object.values(formStructure)
//   .filter(x => !('readOnly' in x && x.readOnly))
//   .map(x => x.question_key)
// console.log(j.length)
// console.log(JSON.stringify(j))
