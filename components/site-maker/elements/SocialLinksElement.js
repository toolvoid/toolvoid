import {
  AtSign,
  Globe,
  Heart,
  Home,
  Mail,
  MessageCircle,
  Star,
} from "lucide-react";
const PLATFORMS = {
  instagram: Heart,
  twitter: AtSign,
  facebook: Home,
  linkedin: Star,
  youtube: Globe,
  whatsapp: MessageCircle,
  email: Mail,
};
export default function SocialLinksElement({ element, editable = false }) {
  const links = element.links || ["instagram", "twitter", "linkedin"];
  return (
    <div
      className="sm-social-element"
      style={{ display: "flex", gap: 10, alignItems: "center" }}
    >
      {links.map((name) => {
        const Icon = PLATFORMS[name] || Heart;
        const href = element.urls?.[name] || "#";
        return (
          <a
            style={{
              display: "grid",
              placeItems: "center",
              width: 36,
              height: 36,
              borderRadius: 999,
              background: "rgba(255,255,255,.14)",
              color: element.style?.color || "#fff",
            }}
            key={name}
            href={href}
            target={element.openInNewTab ? "_blank" : undefined}
            rel={element.openInNewTab ? "noreferrer" : undefined}
            onClick={editable ? (event) => event.preventDefault() : undefined}
            aria-label={name}
          >
            <Icon size={20} />
          </a>
        );
      })}
    </div>
  );
}
