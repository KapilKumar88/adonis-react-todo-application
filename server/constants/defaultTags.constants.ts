/***
 * System Default tags list that will be created for every new user.
 * 
 * Each tag has a name and a color associated with it. The color is represented as a hex code.
 */

const SystemDefaultTags = [
    { name: 'Work', color: '#FF5733', type: 'system' },
    { name: 'Personal', color: '#33C1FF', type: 'system' },
    { name: 'Urgent', color: '#FF3333', type: 'system' },
    { name: 'Later', color: '#33FF57', type: 'system' },
    { name: 'Important', color: '#FFC300', type: 'system' },
] as const;

export default SystemDefaultTags;