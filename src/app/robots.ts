import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/love-test/question/"],
    },
    sitemap: "https://dhc-web.vercel.app/sitemap.xml",
  };
}
