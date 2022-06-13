import { TIME_GREETINGS } from '../constants/timeGreetings';
import { PAGE_MESSAGES } from '../constants/pageMessages';

export function greetingGenerator(currentPageName, currentHour) {
    let greeting;

    Object.entries(TIME_GREETINGS).forEach(timePart => {
        const timePartKey = timePart[0];
        const timePartValues = timePart[1];

        if (timePartValues.some(hour => hour === currentHour)) {
            greeting = timePartKey;
            return;
        }
    });

    const message = PAGE_MESSAGES[currentPageName];

    return {
        greeting: greeting,
        message: message
    }
}