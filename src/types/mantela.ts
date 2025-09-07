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
	accuracy: z.number().min(0).optional(),
	altitude: z.number().or(z.null()).optional(),
	altitudeAccuracy: z.number().min(0).or(z.null()).optional(),
	latitude: z.number().min(-90).max(90).optional(),
	longitude: z.number().min(-180).max(180).optional(),
});

export const AboutMeSchema = z.object({
	geolocationCoordinates: geolocationCoordinatesSchema.optional(),
	identifier: z.string(),
	image: z.url().optional(),
	name: z.string(),
	preferredPrefix: z.string().or(z.array(z.string())),
	sipPassword: z.string().optional(),
	sipPort: z.string().optional(),
	sipServer: z.string().optional(),
	sipUri: z.array(z.url()).optional(),
	sipUsername: z.string().optional(),
	unavailable: z.boolean().optional(),
});

export const ExtensionSchema = z.object({
	extension: z.string(),
	geolocationCoordinates: geolocationCoordinatesSchema.optional(),
	identifier: z.string().optional(),
	image: z.url().optional(),
	model: z.string().optional(),
	name: z.string(),
	transferTo: z.array(z.string()).optional(),
	type: ExtensionTypeEnum.optional(),
});

export const ProviderSchema = z.object({
	identifier: z.string().optional(),
	mantela: z.string().optional(),
	name: z.string(),
	prefix: z.string(),
	unavailable: z.boolean().optional(),
});

export const MantelaSchema = z.object({
	$schema: z.string().optional(),
	aboutMe: AboutMeSchema,
	extensions: z.array(ExtensionSchema),
	providers: z.array(ProviderSchema),
	version: z.string(),
});

export type Mantela = z.infer<typeof MantelaSchema>;
export type MantelaExtension = z.infer<typeof ExtensionSchema>;
