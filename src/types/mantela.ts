import { z } from "zod";
export const ExtensionTypeEnum = z.enum([
  "alias",
  "application",
  "cellphone",
  "conference",
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

export const geolocationCoordinatesSchema = z.object({
  latitude: z
    .number().min(-90).max(90).optional(),
  longitude: z
    .number().min(-180).max(180).optional(),
  altitude: z.number().or(z.null()).optional(),
  accuracy: z.number().min(0).optional(),
  altitudeAccuracy: z.number().min(0).or(z.null()).optional(),
});

export const AboutMeSchema = z.object({
  name: z.string(),
  preferredPrefix: z.array(z.string()),
  identifier: z.string(),
  sipUsername: z.string().optional(),
  sipPassword: z.string().optional(),
  sipServer: z.string().optional(),
  sipPort: z.string().optional(),
  sipUri: z.string().optional(),
  geolocationCoordinates: geolocationCoordinatesSchema.optional(),
  unavailable: z.boolean().optional(),
});

export const ExtensionSchema = z.object({
  name: z.string(),
  extension: z.string(),
  identifier: z.string().optional(),
  type: ExtensionTypeEnum.optional(),
  transferTo: z.array(z.string()).optional(),
  geolocationCoordinates: geolocationCoordinatesSchema.optional(),
});

export const ProviderSchema = z.object({
  name: z.string(),
  prefix: z.string(),
  identifier: z.string().optional(),
  mantela: z.string().optional(),
  unavailable: z.boolean().optional(),
});

export const MantelaSchema = z.object({
  $schema: z.string().optional(),
  version: z.string(),
  aboutMe: AboutMeSchema,
  extensions: z.array(ExtensionSchema),
  providers: z.array(ProviderSchema),
});

export type Mantela = z.infer<typeof MantelaSchema>;
export type MantelaExtension = z.infer<typeof ExtensionSchema>;
