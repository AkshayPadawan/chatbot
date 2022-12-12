import { User, STATUSES, Message } from "./models";

export const RANDOM_MSGS = [
  
];

export const TYPE_OF_MSG: any = ["replies", "sent"];

export const getRandom = items =>
  items[Math.floor(Math.random() * items.length)];

export function generateMessage(length) {
  return Array.from({ length }).map(
    () => new Message(getRandom(TYPE_OF_MSG), getRandom(RANDOM_MSGS))
  );
}

export const MESSAGES = [];

export const USERS = [
  new User(
    "Solugenix",
    STATUSES.BUSY,
    "https://media.glassdoor.com/sqll/222338/solugenix-corporation-squarelogo-1421096570341.png",
    generateMessage(0)
  ),
];
