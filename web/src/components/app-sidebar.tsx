"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import {
  LayoutDashboard,
  Settings,
  Key,
  Shield,
  KeyRound,
  BarChart3,
  ScrollText,
  Server,
  Sun,
  Moon,
  Languages,
  Boxes,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar";

import { t, localeNames, type Locale } from "@/lib/i18n";
import { useLocale } from "@/lib/locale-context";

const navItems = [
  { titleKey: "nav.dashboard", href: "/dashboard", icon: LayoutDashboard },
  { titleKey: "nav.config", href: "/config", icon: Settings },
  { titleKey: "nav.authFiles", href: "/auth-files", icon: Key },
  { titleKey: "nav.oauth", href: "/oauth", icon: Shield },
  { titleKey: "nav.models", href: "/models", icon: Boxes },
  { titleKey: "nav.apiKeys", href: "/api-keys", icon: KeyRound },
  { titleKey: "nav.usage", href: "/usage", icon: BarChart3 },
  { titleKey: "nav.logs", href: "/logs", icon: ScrollText },
];

function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <SidebarMenuButton
      tooltip={t("theme.toggle")}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      <Sun className="hidden dark:block" />
      <Moon className="block dark:hidden" />
      <span>{theme === "dark" ? t("theme.light") : t("theme.dark")}</span>
    </SidebarMenuButton>
  );
}

const LOCALE_KEYS: Locale[] = ["en", "zh-CN", "zh-TW"];

function LocaleToggle() {
  const { locale, setLocale } = useLocale();

  const nextIndex = (LOCALE_KEYS.indexOf(locale) + 1) % LOCALE_KEYS.length;
  const nextLocale = LOCALE_KEYS[nextIndex];

  return (
    <SidebarMenuButton
      tooltip={t("locale.switch")}
      onClick={() => setLocale(nextLocale)}
    >
      <Languages />
      <span>{localeNames[locale]}</span>
    </SidebarMenuButton>
  );
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  useLocale();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/dashboard">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Server className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-heading font-semibold">{t("app.title")}</span>
                  <span className="text-xs text-muted-foreground">
                    {t("app.subtitle")}
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{t("nav.navigation")}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.href}
                    tooltip={t(item.titleKey)}
                  >
                    <Link href={item.href}>
                      <item.icon />
                      <span>{t(item.titleKey)}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <LocaleToggle />
          </SidebarMenuItem>
          <SidebarMenuItem>
            <ThemeToggle />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
