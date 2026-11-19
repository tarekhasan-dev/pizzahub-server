import "dotenv/config";

const uri = process.env.MONGODB_URI || "";
const match = uri.match(/^mongodb(\+srv)?:\/\/([^:]+):(.*)@([^@]+)$/);

if (!uri) {
  console.log("MONGODB_URI পাওয়া যায়নি। .env এর নাম বা জায়গা ভুল।");
} else if (!match) {
  console.log("URI এর format ভুল। শুরু:", uri.slice(0, 20));
} else {
  const [, , user, pass, host] = match;
  console.log("username :", user);
  console.log("host     :", host);
  console.log("password length:", pass.length);
  console.log("< > আছে?        :", /[<>]/.test(pass));
  console.log("space আছে?      :", /\s/.test(pass));
  console.log("বিশেষ চিহ্ন আছে? :", /[^A-Za-z0-9]/.test(pass));
}