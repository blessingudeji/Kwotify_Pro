import Alpine from "alpinejs";
import persist from "@alpinejs/persist";
import "./style.css";
import supabase from "./auth";
import { z } from "zod";
// import { counter } from './counter';

window.Alpine = Alpine;

// alternative way
// Alpine.data('counter', counter);
Alpine.plugin(persist);
//Homepage
Alpine.data("quotes", () => ({
  quotelist: getQuotesRandom(),
  query: "",
  imgsrc: [
    `http://img.bruzu.com/?backgroundImage=https://source.unsplash.com/U-Kty6HxcQc/600x400&backgroundImage.opacity=0.9&height=400&width=600&d=1&a.textAlign=center&a.fontSize=24&a.color=white&a.`,

    `http://img.bruzu.com/?backgroundImage=https://source.unsplash.com/uqAUg1zvMXQ/600x400&backgroundImage.opacity=0.9&height=400&width=600&d=1&a.textAlign=center&a.fontSize=24&a.color=white&a.`,
  ],
  init: () => {
    console.log("hey");
  },

  getQuotesR: async ({ quotelist }) => {
    let response = await fetch("https://api.quotable.io/quotes/random?limit=4");
    let responseJ = await response.json();
    console.log(responseJ);
    quotelist = responseJ;
  },
  yankQuote: async (quote)=>{
    const { content, author } = quote;
    await navigator.clipboard.writeText(`${content} -- ${author}`);  }
}));

// Signup Logic

const signupSchema = z.object({
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  password: z.string().min(8, "Password should be at least 8 characters long"),
});
const loginSchema = z.object({
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  password: z.string().min(8, "Password should be at least 8 characters long"),
});


Alpine.data("signup", () => ({
  email: "",
  password: "",
  errors: {},
  loading: false,
  async submitForm() {
    const formData = {
      email: this.email,
      password: this.password,
      confirmPassword: this.confirmPassword,
    };
    this.loading = true;
    try {
      signupSchema.parse(formData);
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });
      console.log({ data, error });

      if (error) {
        console.log({ data, error });

        if (error.message.includes("unique")) {
          this.errors.email = "Email is already taken";
        } else {
          this.errors.general = error.message;
        }
        return;
      }
      this.loading = false;
      console.log({ data, error });
      // Successful signup, do something here (e.g., redirect)
      window.location.pathname = "/welcome.html";
    } catch (error) {
      this.loading = false;
      if (error instanceof z.ZodError) {
        this.errors = error.errors.reduce((acc, err) => {
          acc[err.path[0]] = err.message;
          return acc;
        }, {});
      } else {
        this.errors.general = error.message;
      }
    }
  },
}));

Alpine.data("login", () => ({
  email: "",
  password: "",
  loading: false,
  err: {},
  async login({ email, password }) {
    const formData = {
      email: this.email,
      password: this.password,
      confirmPassword: this.confirmPassword,
    };
    this.loading = true;
    try {
      loginSchema.parse(formData);
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
      this.loading = false;
      console.log({ data, error });
      console.log({session:data.session})
       if(error == null){
         localStorage.setItem("kwotify-session", JSON.stringify(data.session))
         window.location.pathname = "/dashboard.html";//.session data.session)
       }else{
         this.err.loginErr = error.message
       }
       //window.location.pathname = "/index.html";
    } catch (error) {
      console.log(error);
      this.loading = false;
      if (error instanceof z.ZodError) {
        this.err = error.errors.reduce((acc, err) => {
          acc[err.path[0]] = err.message;
          return acc;
        }, {});
      } else {
        this.err.general = error.message;
      }
    }
  },
}));


export async function getQuotesRandom() {
  let response = await fetch("https://api.quotable.io/quotes/random?limit=4");
  let responseJ = await response.json();
  console.log(responseJ);
  const res = responseJ.map((q, i) => {
    i == 0 ? (q.active = true) : (q.active = false);
    return q;
  });
  console.log;
  return res;
  
}
async function getQuotesSearch() {
  let response = await fetch(
    "https://api.quotable.io/search/quotes?query=every?"
  );
  let responseJ = await response.json();
  console.log(responseJ);
  return responseJ;
 
}
Alpine.start();
