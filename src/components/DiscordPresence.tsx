import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Music, Gamepad2, Award, Zap, Shield, Crown } from "lucide-react";

interface LanyardData {
  discord_user: {
    username: string;
    discriminator: string;
    avatar: string;
    id: string;
    display_name?: string;
    avatar_decoration_data?: {
      asset: string;
      sku_id: string;
    };
    public_flags?: number;
  };
  discord_status: "online" | "idle" | "dnd" | "offline";
  activities: Array<{
    id: string;
    name: string;
    type: number;
    state?: string;
    details?: string;
    assets?: {
      large_image?: string;
      large_text?: string;
      small_image?: string;
      small_text?: string;
    };
    timestamps?: {
      start?: number;
      end?: number;
    };
  }>;
  spotify?: {
    song: string;
    artist: string;
    album: string;
    album_art_url: string;
    timestamps?: {
      start: number;
      end: number;
    };
  };
  listening_to_spotify: boolean;
}

const DISCORD_ID = "1167472154015711392";

const statusColors = {
  online: "bg-green-500",
  idle: "bg-yellow-500",
  dnd: "bg-red-500",
  offline: "bg-gray-500",
};

const statusLabels = {
  online: "Online",
  idle: "Abwesend",
  dnd: "Nicht stören",
  offline: "Offline",
};

interface DiscordBadge {
  id: string;
  description: string;
  icon: typeof Award;
  flag: number;
}

const DISCORD_BADGES: DiscordBadge[] = [
  { id: "staff", description: "Discord Staff", icon: Shield, flag: 1 << 0 },
  { id: "partner", description: "Partnered Server Owner", icon: Crown, flag: 1 << 1 },
  { id: "hypesquad", description: "HypeSquad Events", icon: Award, flag: 1 << 2 },
  { id: "bug_hunter_level_1", description: "Bug Hunter Level 1", icon: Award, flag: 1 << 3 },
  { id: "hypesquad_bravery", description: "HypeSquad Bravery", icon: Zap, flag: 1 << 6 },
  { id: "hypesquad_brilliance", description: "HypeSquad Brilliance", icon: Zap, flag: 1 << 7 },
  { id: "hypesquad_balance", description: "HypeSquad Balance", icon: Zap, flag: 1 << 8 },
  { id: "early_supporter", description: "Early Supporter", icon: Award, flag: 1 << 9 },
  { id: "bug_hunter_level_2", description: "Bug Hunter Level 2", icon: Award, flag: 1 << 14 },
  { id: "verified_bot_developer", description: "Early Verified Bot Developer", icon: Award, flag: 1 << 17 },
  { id: "active_developer", description: "Active Developer", icon: Award, flag: 1 << 22 },
];

export default function DiscordPresence() {
  const [data, setData] = useState<LanyardData | null>(null);
  const [error, setError] = useState(false);
  const [spotifyProgress, setSpotifyProgress] = useState(0);

  useEffect(() => {
    let ws: WebSocket | null = null;
    let heartbeatInterval: NodeJS.Timeout | null = null;

    const connect = () => {
      ws = new WebSocket("wss://api.lanyard.rest/socket");

      ws.onopen = () => console.log("Connected to Lanyard WebSocket");

      ws.onmessage = (event) => {
        const message = JSON.parse(event.data);

        if (message.op === 1) {
          const heartbeatInterval_ = setInterval(() => {
            if (ws?.readyState === WebSocket.OPEN) {
              ws.send(JSON.stringify({ op: 3 }));
            }
          }, message.d.heartbeat_interval);
          heartbeatInterval = heartbeatInterval_;

          ws?.send(
            JSON.stringify({
              op: 2,
              d: { subscribe_to_id: DISCORD_ID },
            })
          );
        } else if (message.op === 0) {
          if (message.t === "INIT_STATE" || message.t === "PRESENCE_UPDATE") {
            setData(message.d);
            setError(false);
          }
        }
      };

      ws.onerror = (err) => {
        console.error("WebSocket error:", err);
        setError(true);
      };

      ws.onclose = () => {
        console.log("WebSocket closed, reconnecting...");
        if (heartbeatInterval) clearInterval(heartbeatInterval);
        setTimeout(connect, 3000);
      };
    };

    connect();

    return () => {
      if (heartbeatInterval) clearInterval(heartbeatInterval);
      ws?.close();
    };
  }, []);

  useEffect(() => {
    if (!data?.spotify?.timestamps) return;
    const updateProgress = () => {
      const now = Date.now();
      const { start, end } = data.spotify!.timestamps!;
      const total = end - start;
      const current = now - start;
      const progress = Math.min(Math.max((current / total) * 100, 0), 100);
      setSpotifyProgress(progress);
    };
    updateProgress();
    const interval = setInterval(updateProgress, 1000);
    return () => clearInterval(interval);
  }, [data?.spotify]);

  if (error) {
    return (
      <Card className="p-6 bg-card/50 backdrop-blur-sm border-primary/20">
        <p className="text-muted-foreground text-center">
          Discord-Status nicht verfügbar
        </p>
        <p className="text-xs text-muted-foreground text-center mt-2">
          Stelle sicher, dass du dem Lanyard Discord-Server beigetreten bist
        </p>
      </Card>
    );
  }

  if (!data) {
    return (
      <Card className="p-6 bg-card/50 backdrop-blur-sm border-primary/20 animate-pulse">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-muted" />
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-muted rounded w-32" />
            <div className="h-3 bg-muted rounded w-24" />
          </div>
        </div>
      </Card>
    );
  }

  const avatarUrl = `https://cdn.discordapp.com/avatars/${data.discord_user.id}/${data.discord_user.avatar}.${data.discord_user.avatar.startsWith("a_") ? "gif" : "png"}?size=256`;
  const avatarDecorationUrl = data.discord_user.avatar_decoration_data
    ? `https://cdn.discordapp.com/avatar-decoration-presets/${data.discord_user.avatar_decoration_data.asset}.png?size=96&passthrough=true`
    : null;

  const game = data.activities.find((a) => a.type === 0);
  const customStatus = data.activities.find((a) => a.type === 4);
  const isOffline = data.discord_status === "offline";

  const userBadges = DISCORD_BADGES.filter(
    (badge) =>
      data.discord_user.public_flags &&
      (data.discord_user.public_flags & badge.flag) === badge.flag
  );

  return (
    <section id="discord" className="scroll-mt-24">
      <Card
        className={`p-4 sm:p-6 backdrop-blur-sm border-primary/20 transition-all duration-500 ${
          isOffline
            ? "bg-card/30 opacity-70"
            : "bg-card/50 hover:border-primary/40 hover:shadow-glow"
        }`}
      >
        {/* dein bisheriger JSX-Inhalt */}
        <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
          {/* Avatar */}
          <div className="relative group mx-auto sm:mx-0">
            <div className="relative w-20 h-20 sm:w-24 sm:h-24">
              <img
                src={avatarUrl}
                alt={`Discord Profilbild von ${data.discord_user.display_name || data.discord_user.username}`}
                className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full transition-all duration-300 ${
                  isOffline ? "grayscale" : "group-hover:scale-105"
                }`}
                width="96"
                height="96"
                loading="lazy"
              />
              {avatarDecorationUrl && !isOffline && (
                <img
                  src={avatarDecorationUrl}
                  alt="Discord Avatar Dekoration"
                  className="absolute -inset-3 sm:-inset-4 w-28 h-24 sm:w-48 sm:h-32 pointer-events-none animate-fade-in"
                  width="192"
                  height="128"
                  loading="lazy"
                  aria-hidden="true"
                />
              )}
            </div>
            <div
              className={`absolute -bottom-1 -right-1 w-6 h-6 sm:w-7 sm:h-7 rounded-full border-4 border-card ${
                statusColors[data.discord_status]
              } transition-all duration-300 shadow-lg`}
            />
          </div>

          {/* Restlicher Inhalt */}
          <div className="flex-1 min-w-0 space-y-3 w-full">
            {/* Name & Badges */}
            <div>
              <div className="flex items-center justify-center sm:justify-start gap-2 mb-1 flex-wrap">
                <h3 className="font-bold text-lg sm:text-xl truncate">
                  {data.discord_user.display_name || data.discord_user.username}
                </h3>
                {userBadges.length > 0 && (
                  <div className="flex gap-1">
                    {userBadges.map((badge) => {
                      const Icon = badge.icon;
                      return (
                        <div key={badge.id} className="group relative" title={badge.description}>
                          <Icon className="w-4 h-4 text-primary" />
                          <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-popover text-popover-foreground text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                            {badge.description}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              <div className="flex items-center justify-center sm:justify-start gap-2 flex-wrap">
                <p className="text-sm text-muted-foreground">
                  @{data.discord_user.username}
                </p>
                <Badge
                  variant="outline"
                  className={`text-xs transition-colors duration-300 ${
                    isOffline ? "opacity-50" : ""
                  }`}
                >
                  {statusLabels[data.discord_status]}
                </Badge>
              </div>
            </div>

            {/* Status */}
            {customStatus && (
              <div className="flex items-center gap-2 p-2 rounded-lg bg-secondary/50 animate-fade-in">
                <span className="text-base">{customStatus.state}</span>
              </div>
            )}

            {/* Game */}
            {game && !isOffline && (
              <div className="flex items-start gap-3 p-3 rounded-lg bg-secondary/50 animate-fade-in">
                <Gamepad2 className="w-5 h-5 mt-0.5 text-primary flex-shrink-0" />
                <div className="min-w-0">
                  <p className="font-semibold truncate">{game.name}</p>
                  {game.details && (
                    <p className="text-sm text-muted-foreground truncate">
                      {game.details}
                    </p>
                  )}
                  {game.state && (
                    <p className="text-sm text-muted-foreground truncate">
                      {game.state}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Spotify */}
            {data.listening_to_spotify && data.spotify && !isOffline && (
              <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20 animate-fade-in">
                <div className="flex items-start gap-3 mb-2">
                  <img
                    src={data.spotify.album_art_url}
                    alt={`Spotify Album Cover: ${data.spotify.album} von ${data.spotify.artist}`}
                    className="w-16 h-16 rounded flex-shrink-0 shadow-lg"
                    width="64"
                    height="64"
                    loading="lazy"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Music className="w-4 h-4 text-green-500 flex-shrink-0 animate-pulse" />
                      <p className="text-xs text-green-500 font-semibold">
                        SPOTIFY
                      </p>
                    </div>
                    <p className="font-semibold truncate text-foreground">
                      {data.spotify.song}
                    </p>
                    <p className="text-sm text-muted-foreground truncate">
                      von {data.spotify.artist}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      auf {data.spotify.album}
                    </p>
                  </div>
                </div>
                {data.spotify.timestamps && (
                  <div className="w-full bg-secondary/50 rounded-full h-1 overflow-hidden">
                    <div
                      className="bg-green-500 h-full transition-all duration-1000 ease-linear"
                      style={{ width: `${spotifyProgress}%` }}
                    />
                  </div>
                )}
              </div>
            )}

            {!game && !data.spotify && !customStatus && !isOffline && (
              <p className="text-sm text-muted-foreground italic">
                Keine Aktivität
              </p>
            )}
          </div>
        </div>
      </Card>
    </section>
  );
}
