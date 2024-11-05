import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
//import { HubYoung } from "hub-young-downloader"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// export async function downloadBook(username, password) {
// 	let obj = new HubYoung()
// 	await obj.login(username, password)
// 	let books = await obj.getBooks();
// 	await obj.download(books[0].value);
// }
