import bcrypt from "bcrypt";

const saltRounds = 8;

export async function hashString(text: string, round: number = saltRounds) {
  return await bcrypt.hash(text, round);
}

export async function compareHash(text: string, hash: string) {
  return await bcrypt.compare(text, hash);
}
