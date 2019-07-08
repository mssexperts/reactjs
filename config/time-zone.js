/* eslint max-lines: 0 */

const timeZone = [
  {
    name: 'Pacific/Niue',
    value: 'Niue',
  },
  {
    name: 'Pacific/Pago_Pago',
    value: 'Pago Pago',
  },
  {
    name: 'Pacific/Honolulu',
    value: 'Hawaii Time',
  },
  {
    name: 'Pacific/Rarotonga',
    value: 'Rarotonga',
  },
  {
    name: 'Pacific/Tahiti',
    value: 'Tahiti',
  },
  {
    name: 'Pacific/Marquesas',
    value: 'Marquesas',
  },
  {
    name: 'Pacific/Gambier',
    value: 'Gambier',
  },
  {
    name: 'America/Anchorage',
    value: 'Alaska Time',
  },
  {
    name: 'Pacific/Pitcairn',
    value: 'Pitcairn',
  },
  {
    name: 'America/Dawson',
    value: 'Dawson',
  },
  {
    name: 'America/Phoenix',
    value: 'Mountain Time - Arizona',
  },
  {
    name: 'America/Dawson_Creek',
    value: 'Mountain Time - Dawson Creek',
  },
  {
    name: 'America/Hermosillo',
    value: 'Mountain Time - Hermosillo',
  },
  {
    name: 'America/Los_Angeles',
    value: 'Pacific Time',
  },
  {
    name: 'America/Tijuana',
    value: 'Pacific Time - Tijuana',
  },
  {
    name: 'America/Vancouver',
    value: 'Pacific Time - Vancouver',
  },
  {
    name: 'America/Whitehorse',
    value: 'Pacific Time - Whitehorse',
  },
  {
    name: 'America/Belize',
    value: 'Belize',
  },
  {
    name: 'America/Boise',
    value: 'Boise',
  },
  {
    name: 'America/Regina',
    value: 'Central Time - Regina',
  },
  {
    name: 'America/Tegucigalpa',
    value: 'Central Time - Tegucigalpa',
  },
  {
    name: 'America/Costa_Rica',
    value: 'Costa Rica',
  },
  {
    name: 'Pacific/Easter',
    value: 'Easter Island',
  },
  {
    name: 'America/El_Salvador',
    value: 'El Salvador',
  },
  {
    name: 'Pacific/Galapagos',
    value: 'Galapagos',
  },
  {
    name: 'America/Guatemala',
    value: 'Guatemala',
  },
  {
    name: 'America/Managua',
    value: 'Managua',
  },
  {
    name: 'America/Denver',
    value: 'Mountain Time',
  },
  {
    name: 'America/Mazatlan',
    value: 'Mountain Time - Chihuahua, Mazatlan',
  },
  {
    name: 'America/Edmonton',
    value: 'Mountain Time - Edmonton',
  },
  {
    name: 'America/Yellowknife',
    value: 'Mountain Time - Yellowknife',
  },
  {
    name: 'America/Cancun',
    value: 'America Cancun',
  },
  {
    name: 'America/Bogota',
    value: 'Bogota',
  },
  {
    name: 'America/Chicago',
    value: 'Central Time',
  },
  {
    name: 'America/Mexico_City',
    value: 'Central Time - Mexico City',
  },
  {
    name: 'America/Winnipeg',
    value: 'Central Time - Winnipeg',
  },
  {
    name: 'America/Guayaquil',
    value: 'Guayaquil',
  },
  {
    name: 'America/Jamaica',
    value: 'Jamaica',
  },
  {
    name: 'America/Lima',
    value: 'Lima',
  },
  {
    name: 'America/Panama',
    value: 'Panama',
  },
  {
    name: 'America/Rio_Branco',
    value: 'Rio Branco',
  },
  {
    name: 'America/Asuncion',
    value: 'Asuncion',
  },
  {
    name: 'America/Barbados',
    value: 'Barbados',
  },
  {
    name: 'America/Boa_Vista',
    value: 'Boa Vista',
  },
  {
    name: 'America/Campo_Grande',
    value: 'Campo Grande',
  },
  {
    name: 'America/Caracas',
    value: 'Caracas',
  },
  {
    name: 'America/Cuiaba',
    value: 'Cuiaba',
  },
  {
    name: 'America/Curacao',
    value: 'Curacao',
  },
  {
    name: 'America/Detroit',
    value: 'Detroit',
  },
  {
    name: 'America/New_York',
    value: 'Eastern Time',
  },
  {
    name: 'America/Iqaluit',
    value: 'Eastern Time - Iqaluit',
  },
  {
    name: 'America/Toronto',
    value: 'Eastern Time - Toronto',
  },
  {
    name: 'America/Grand_Turk',
    value: 'Grand Turk',
  },
  {
    name: 'America/Guyana',
    value: 'Guyana',
  },
  {
    name: 'America/Havana',
    value: 'Havana',
  },
  {
    name: 'America/La_Paz',
    value: 'La Paz',
  },
  {
    name: 'America/Manaus',
    value: 'Manaus',
  },
  {
    name: 'America/Martinique',
    value: 'Martinique',
  },
  {
    name: 'America/Nassau',
    value: 'Nassau',
  },
  {
    name: 'America/Port_of_Spain',
    value: 'Port of Spain',
  },
  {
    name: 'America/Port-au-Prince',
    value: 'Port-au-Prince',
  },
  {
    name: 'America/Porto_Velho',
    value: 'Porto Velho',
  },
  {
    name: 'America/Puerto_Rico',
    value: 'Puerto Rico',
  },
  {
    name: 'America/Santiago',
    value: 'Santiago',
  },
  {
    name: 'America/Santo_Domingo',
    value: 'Santo Domingo',
  },
  {
    name: 'America/Araguaina',
    value: 'Araguaina',
  },
  {
    name: 'America/Halifax',
    value: 'Atlantic Time - Halifax',
  },
  {
    name: 'America/Belem',
    value: 'Belem',
  },
  {
    name: 'Atlantic/Bermuda',
    value: 'Bermuda',
  },
  {
    name: 'America/Argentina/Buenos_Aires',
    value: 'Buenos Aires',
  },
  {
    name: 'America/Cayenne',
    value: 'Cayenne',
  },
  {
    name: 'America/Argentina/Cordoba',
    value: 'Cordoba',
  },
  {
    name: 'America/Fortaleza',
    value: 'Fortaleza',
  },
  {
    name: 'America/Maceio',
    value: 'Maceio',
  },
  {
    name: 'America/Montevideo',
    value: 'Montevideo',
  },
  {
    name: 'Antarctica/Palmer',
    value: 'Palmer',
  },
  {
    name: 'America/Paramaribo',
    value: 'Paramaribo',
  },
  {
    name: 'America/Punta_Arenas',
    value: 'Punta Arenas',
  },
  {
    name: 'America/Recife',
    value: 'Recife',
  },
  {
    name: 'Antarctica/Rothera',
    value: 'Rothera',
  },
  {
    name: 'America/Bahia',
    value: 'Salvador',
  },
  {
    name: 'America/Sao_Paulo',
    value: 'Sao Paulo',
  },
  {
    name: 'Atlantic/Stanley',
    value: 'Stanley',
  },
  {
    name: 'America/Thule',
    value: 'Thule',
  },
  {
    name: 'America/St_Johns',
    value: 'Newfoundland Time - St. Johns',
  },
  {
    name: 'America/Godthab',
    value: 'Godthab',
  },
  {
    name: 'America/Miquelon',
    value: 'Miquelon',
  },
  {
    name: 'America/Noronha',
    value: 'Noronha',
  },
  {
    name: 'Atlantic/South_Georgia',
    value: 'South Georgia',
  },
  {
    name: 'Atlantic/Cape_Verde',
    value: 'Cape Verde',
  },
  {
    name: 'Africa/Abidjan',
    value: 'Abidjan',
  },
  {
    name: 'Africa/Accra',
    value: 'Accra',
  },
  {
    name: 'Atlantic/Azores',
    value: 'Azores',
  },
  {
    name: 'Africa/Bissau',
    value: 'Bissau',
  },
  {
    name: 'Africa/Casablanca',
    value: 'Casablanca',
  },
  {
    name: 'America/Danmarkshavn',
    value: 'Danmarkshavn',
  },
  {
    name: 'Africa/El_Aaiun',
    value: 'El Aaiun',
  },
  {
    name: 'Etc/GMT',
    value: 'GMT (no daylight saving)',
  },
  {
    name: 'Africa/Monrovia',
    value: 'Monrovia',
  },
  {
    name: 'Atlantic/Reykjavik',
    value: 'Reykjavik',
  },
  {
    name: 'America/Scoresbysund',
    value: 'Scoresbysund',
  },
  {
    name: 'UTC',
    value: 'UTC',
  },
  {
    name: 'Africa/Algiers',
    value: 'Algiers',
  },
  {
    name: 'Atlantic/Canary',
    value: 'Canary Islands',
  },
  {
    name: 'Europe/Dublin',
    value: 'Dublin',
  },
  {
    name: 'Atlantic/Faroe',
    value: 'Faeroe',
  },
  {
    name: 'Africa/Lagos',
    value: 'Lagos',
  },
  {
    name: 'Europe/Lisbon',
    value: 'Lisbon',
  },
  {
    name: 'Europe/London',
    value: 'London',
  },
  {
    name: 'Africa/Ndjamena',
    value: 'Ndjamena',
  },
  {
    name: 'Africa/Sao_Tome',
    value: 'Sao Tome',
  },
  {
    name: 'Africa/Tunis',
    value: 'Tunis',
  },
  {
    name: 'Europe/Amsterdam',
    value: 'Amsterdam',
  },
  {
    name: 'Europe/Andorra',
    value: 'Andorra',
  },
  {
    name: 'Europe/Berlin',
    value: 'Berlin',
  },
  {
    name: 'Europe/Brussels',
    value: 'Brussels',
  },
  {
    name: 'Europe/Budapest',
    value: 'Budapest',
  },
  {
    name: 'Africa/Cairo',
    value: 'Cairo',
  },
  {
    name: 'Europe/Belgrade',
    value: 'Central European Time - Belgrade',
  },
  {
    name: 'Europe/Prague',
    value: 'Central European Time - Prague',
  },
  {
    name: 'Africa/Ceuta',
    value: 'Ceuta',
  },
  {
    name: 'Europe/Copenhagen',
    value: 'Copenhagen',
  },
  {
    name: 'Europe/Gibraltar',
    value: 'Gibraltar',
  },
  {
    name: 'Africa/Johannesburg',
    value: 'Johannesburg',
  },
  {
    name: 'Africa/Khartoum',
    value: 'Khartoum',
  },
  {
    name: 'Europe/Luxembourg',
    value: 'Luxembourg',
  },
  {
    name: 'Europe/Madrid',
    value: 'Madrid',
  },
  {
    name: 'Europe/Malta',
    value: 'Malta',
  },
  {
    name: 'Africa/Maputo',
    value: 'Maputo',
  },
  {
    name: 'Europe/Monaco',
    value: 'Monaco',
  },
  {
    name: 'Europe/Kaliningrad',
    value: 'Moscow-01 - Kaliningrad',
  },
  {
    name: 'Europe/Oslo',
    value: 'Oslo',
  },
  {
    name: 'Europe/Paris',
    value: 'Paris',
  },
  {
    name: 'Europe/Rome',
    value: 'Rome',
  },
  {
    name: 'Europe/Stockholm',
    value: 'Stockholm',
  },
  {
    name: 'Europe/Tirane',
    value: 'Tirane',
  },
  {
    name: 'Africa/Tripoli',
    value: 'Tripoli',
  },
  {
    name: 'Europe/Vienna',
    value: 'Vienna',
  },
  {
    name: 'Europe/Warsaw',
    value: 'Warsaw',
  },
  {
    name: 'Africa/Windhoek',
    value: 'Windhoek',
  },
  {
    name: 'Europe/Zurich',
    value: 'Zurich',
  },
  {
    name: 'Asia/Amman',
    value: 'Amman',
  },
  {
    name: 'Europe/Athens',
    value: 'Athens',
  },
  {
    name: 'Asia/Baghdad',
    value: 'Baghdad',
  },
  {
    name: 'Asia/Beirut',
    value: 'Beirut',
  },
  {
    name: 'Europe/Bucharest',
    value: 'Bucharest',
  },
  {
    name: 'Europe/Chisinau',
    value: 'Chisinau',
  },
  {
    name: 'Asia/Damascus',
    value: 'Damascus',
  },
  {
    name: 'Asia/Gaza',
    value: 'Gaza',
  },
  {
    name: 'Europe/Helsinki',
    value: 'Helsinki',
  },
  {
    name: 'Europe/Istanbul',
    value: 'Istanbul',
  },
  {
    name: 'Asia/Jerusalem',
    value: 'Jerusalem',
  },
  {
    name: 'Europe/Kiev',
    value: 'Kiev',
  },
  {
    name: 'Europe/Minsk',
    value: 'Minsk',
  },
  {
    name: 'Europe/Moscow',
    value: 'Moscow+00 - Moscow',
  },
  {
    name: 'Africa/Nairobi',
    value: 'Nairobi',
  },
  {
    name: 'Asia/Nicosia',
    value: 'Nicosia',
  },
  {
    name: 'Asia/Qatar',
    value: 'Qatar',
  },
  {
    name: 'Europe/Riga',
    value: 'Riga',
  },
  {
    name: 'Asia/Riyadh',
    value: 'Riyadh',
  },
  {
    name: 'Europe/Sofia',
    value: 'Sofia',
  },
  {
    name: 'Antarctica/Syowa',
    value: 'Syowa',
  },
  {
    name: 'Europe/Tallinn',
    value: 'Tallinn',
  },
  {
    name: 'Europe/Vilnius',
    value: 'Vilnius',
  },
  {
    name: 'Asia/Baku',
    value: 'Baku',
  },
  {
    name: 'Asia/Dubai',
    value: 'Dubai',
  },
  {
    name: 'Indian/Mahe',
    value: 'Mahe',
  },
  {
    name: 'Indian/Mauritius',
    value: 'Mauritius',
  },
  {
    name: 'Europe/Samara',
    value: 'Moscow+01 - Samara',
  },
  {
    name: 'Indian/Reunion',
    value: 'Reunion',
  },
  {
    name: 'Asia/Tbilisi',
    value: 'Tbilisi',
  },
  {
    name: 'Asia/Yerevan',
    value: 'Yerevan',
  },
  {
    name: 'Asia/Kabul',
    value: 'Kabul',
  },
  {
    name: 'Asia/Tehran',
    value: 'Tehran',
  },
  {
    name: 'Asia/Aqtau',
    value: 'Aqtau',
  },
  {
    name: 'Asia/Aqtobe',
    value: 'Aqtobe',
  },
  {
    name: 'Asia/Ashgabat',
    value: 'Ashgabat',
  },
  {
    name: 'Asia/Dushanbe',
    value: 'Dushanbe',
  },
  {
    name: 'Asia/Karachi',
    value: 'Karachi',
  },
  {
    name: 'Indian/Kerguelen',
    value: 'Kerguelen',
  },
  {
    name: 'Indian/Maldives',
    value: 'Maldives',
  },
  {
    name: 'Antarctica/Mawson',
    value: 'Mawson',
  },
  {
    name: 'Asia/Yekaterinburg',
    value: 'Moscow+02 - Yekaterinburg',
  },
  {
    name: 'Asia/Tashkent',
    value: 'Tashkent',
  },
  {
    name: 'Asia/Colombo',
    value: 'Colombo',
  },
  {
    name: 'Asia/Calcutta',
    value: 'India Standard Time',
  },
  {
    name: 'Asia/Katmandu',
    value: 'Katmandu',
  },
  {
    name: 'Asia/Almaty',
    value: 'Almaty',
  },
  {
    name: 'Asia/Bishkek',
    value: 'Bishkek',
  },
  {
    name: 'Indian/Chagos',
    value: 'Chagos',
  },
  {
    name: 'Asia/Dhaka',
    value: 'Dhaka',
  },
  {
    name: 'Asia/Omsk',
    value: 'Moscow+03 - Omsk',
  },
  {
    name: 'Asia/Thimphu',
    value: 'Thimphu',
  },
  {
    name: 'Antarctica/Vostok',
    value: 'Vostok',
  },
  {
    name: 'Indian/Cocos',
    value: 'Cocos',
  },
  {
    name: 'Asia/Yangon',
    value: 'Rangoon',
  },
  {
    name: 'Asia/Bangkok',
    value: 'Bangkok',
  },
  {
    name: 'Indian/Christmas',
    value: 'Christmas',
  },
  {
    name: 'Antarctica/Davis',
    value: 'Davis',
  },
  {
    name: 'Asia/Saigon',
    value: 'Hanoi',
  },
  {
    name: 'Asia/Hovd',
    value: 'Hovd',
  },
  {
    name: 'Asia/Jakarta',
    value: 'Jakarta',
  },
  {
    name: 'Asia/Krasnoyarsk',
    value: 'Moscow+04 - Krasnoyarsk',
  },
  {
    name: 'Asia/Brunei',
    value: 'Brunei',
  },
  {
    name: 'Antarctica/Casey',
    value: 'Casey',
  },
  {
    name: 'Asia/Shanghai',
    value: 'China Time - Beijing',
  },
  {
    name: 'Asia/Choibalsan',
    value: 'Choibalsan',
  },
  {
    name: 'Asia/Hong_Kong',
    value: 'Hong Kong',
  },
  {
    name: 'Asia/Kuala_Lumpur',
    value: 'Kuala Lumpur',
  },
  {
    name: 'Asia/Macau',
    value: 'Macau',
  },
  {
    name: 'Asia/Makassar',
    value: 'Makassar',
  },
  {
    name: 'Asia/Manila',
    value: 'Manila',
  },
  {
    name: 'Asia/Irkutsk',
    value: 'Moscow+05 - Irkutsk',
  },
  {
    name: 'Asia/Singapore',
    value: 'Singapore',
  },
  {
    name: 'Asia/Taipei',
    value: 'Taipei',
  },
  {
    name: 'Asia/Ulaanbaatar',
    value: 'Ulaanbaatar',
  },
  {
    name: 'Australia/Perth',
    value: 'Western Time - Perth',
  },
  {
    name: 'Asia/Dili',
    value: 'Dili',
  },
  {
    name: 'Asia/Jayapura',
    value: 'Jayapura',
  },
  {
    name: 'Asia/Yakutsk',
    value: 'Moscow+06 - Yakutsk',
  },
  {
    name: 'Pacific/Palau',
    value: 'Palau',
  },
  {
    name: 'Asia/Pyongyang',
    value: 'Pyongyang',
  },
  {
    name: 'Asia/Seoul',
    value: 'Seoul',
  },
  {
    name: 'Asia/Tokyo',
    value: 'Tokyo',
  },
  {
    name: 'Australia/Adelaide',
    value: 'Central Time - Adelaide',
  },
  {
    name: 'Australia/Darwin',
    value: 'Central Time - Darwin',
  },
  {
    name: 'Antarctica/DumontDUrville',
    value: 'Dumont D\'Urville',
  },
  {
    name: 'Australia/Brisbane',
    value: 'Eastern Time - Brisbane',
  },
  {
    name: 'Australia/Hobart',
    value: 'Eastern Time - Hobart',
  },
  {
    name: 'Australia/Melbourne',
    value: 'Eastern Time - Melbourne',
  },
  {
    name: 'Australia/Sydney',
    value: 'Eastern Time - Melbourne, Sydney',
  },
  {
    name: 'Pacific/Guam',
    value: 'Guam',
  },
  {
    name: 'Asia/Vladivostok',
    value: 'Moscow+07 - Vladivostok',
  },
  {
    name: 'Pacific/Port_Moresby',
    value: 'Port Moresby',
  },
  {
    name: 'Pacific/Chuuk',
    value: 'Truk',
  },
  {
    name: 'Pacific/Efate',
    value: 'Efate',
  },
  {
    name: 'Pacific/Guadalcanal',
    value: 'Guadalcanal',
  },
  {
    name: 'Pacific/Kosrae',
    value: 'Kosrae',
  },
  {
    name: 'Asia/Magadan',
    value: 'Moscow+08 - Magadan',
  },
  {
    name: 'Pacific/Norfolk',
    value: 'Norfolk',
  },
  {
    name: 'Pacific/Noumea',
    value: 'Noumea',
  },
  {
    name: 'Pacific/Pohnpei',
    value: 'Ponape',
  },
  {
    name: 'Pacific/Auckland',
    value: 'Auckland',
  },
  {
    name: 'Pacific/Fiji',
    value: 'Fiji',
  },
  {
    name: 'Pacific/Funafuti',
    value: 'Funafuti',
  },
  {
    name: 'Pacific/Kwajalein',
    value: 'Kwajalein',
  },
  {
    name: 'Pacific/Majuro',
    value: 'Majuro',
  },
  {
    name: 'Asia/Kamchatka',
    value: 'Moscow+09 - Petropavlovsk-Kamchatskiy',
  },
  {
    name: 'Pacific/Nauru',
    value: 'Nauru',
  },
  {
    name: 'Pacific/Tarawa',
    value: 'Tarawa',
  },
  {
    name: 'Pacific/Wake',
    value: 'Wake',
  },
  {
    name: 'Pacific/Wallis',
    value: 'Wallis',
  },
  {
    name: 'Pacific/Apia',
    value: 'Apia',
  },
  {
    name: 'Pacific/Enderbury',
    value: 'Enderbury',
  },
  {
    name: 'Pacific/Fakaofo',
    value: 'Fakaofo',
  },
  {
    name: 'Pacific/Tongatapu',
    value: 'Tongatapu',
  },
  {
    name: 'Pacific/Kiritimati',
    value: 'Kiritimati',
  },
];

export default timeZone;
