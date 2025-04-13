import { z } from "zod";

export const ExtensionTypeEnum = z.enum([
  "alias",
  "application",
  "cellphone",
  "dialphone",
  "fax",
  "information",
  "main",
  "modem",
  "music",
  "other",
  "phone",
  "pushphone",
  "reserved",
  "smartphone",
  "switchboard",
  "unknown",
  "unused",
]);

export const AboutMeSchema = z.object({
  name: z.string(),
  preferredPrefix: z.union([z.string(), z.array(z.string())]).optional(),
  identifier: z.string().optional(),
  sipUsername: z.string().optional(),
  sipPassword: z.string().optional(),
  sipServer: z.string().optional(),
  sipPort: z.string().optional(),
  unavailable: z.boolean().optional(),
});

export const ExtensionSchema = z.object({
  name: z.string(),
  extension: z.string(),
  identifier: z.string().optional(),
  type: ExtensionTypeEnum.optional(),
});

export const ProviderSchema = z.object({
  name: z.string(),
  prefix: z.string(),
  identifier: z.string().optional(),
  mantela: z.string().optional(),
});

export const MantelaSchema = z.object({
  $schema: z.string().optional(),
  version: z.string(),
  aboutMe: AboutMeSchema,
  extensions: z.array(ExtensionSchema),
  providers: z.array(ProviderSchema),
});

export type Mantela = z.infer<typeof MantelaSchema>;
