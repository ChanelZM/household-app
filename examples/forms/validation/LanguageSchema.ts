import { z } from "zod";

enum Language {
  Dutch = "Dutch",
  German = "German",
  Polish = "Polish",
}

const LanguageSchema = z.object({
  languages: z.array(z.nativeEnum(Language)),
});

export default LanguageSchema;
