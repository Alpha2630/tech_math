"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { Menu, X, LogOut, LayoutDashboard, BookOpen } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);
  const [open, setOpen] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, [supabase.auth]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  const isActive = (path: string) =>
    pathname === path || pathname.startsWith(path + "/");

  return (
    <div className="navbar bg-base-200/80 backdrop-blur-md border-b border-primary/20 sticky top-0 z-50 px-4 lg:px-8">
      <div className="navbar-start">
        <div className="dropdown lg:hidden">
          <button
            className="btn btn-ghost btn-circle"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
          {open && (
            <ul className="menu menu-sm dropdown-content mt-3 z-[1] p-3 shadow-xl bg-base-200 rounded-box w-56 border border-primary/20">
              <li>
                <Link href="/" onClick={() => setOpen(false)}>
                  Accueil
                </Link>
              </li>
              {user && (
                <>
                  <li>
                    <Link href="/dashboard" onClick={() => setOpen(false)}>
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link href="/lessons" onClick={() => setOpen(false)}>
                      Leçons
                    </Link>
                  </li>
                </>
              )}
              {!user && (
                <li>
                  <Link href="/login" onClick={() => setOpen(false)}>
                    Connexion
                  </Link>
                </li>
              )}
            </ul>
          )}
        </div>
        <Link href="/" className="btn btn-ghost text-xl font-bold gap-2">
          <span className="text-primary glow-text">⚡</span>
          <span className="hidden sm:inline">
            Tech<span className="text-primary">Math</span>Guide
          </span>
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-1">
          <li>
            <Link
              href="/"
              className={isActive("/") && pathname === "/" ? "active" : ""}
            >
              Accueil
            </Link>
          </li>
          {user && (
            <>
              <li>
                <Link
                  href="/dashboard"
                  className={isActive("/dashboard") ? "active" : ""}
                >
                  <LayoutDashboard size={16} />
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="/lessons"
                  className={isActive("/lessons") ? "active" : ""}
                >
                  <BookOpen size={16} />
                  Leçons
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>

      <div className="navbar-end gap-2">
        {user ? (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar placeholder"
            >
              <div className="bg-primary text-primary-content rounded-full w-10">
                <span className="text-sm font-bold">
                  {user.email?.[0]?.toUpperCase() ?? "U"}
                </span>
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-xl bg-base-200 rounded-box w-52 border border-primary/20"
            >
              <li className="menu-title">
                <span className="text-xs truncate">{user.email}</span>
              </li>
              <li>
                <Link href="/dashboard">Dashboard</Link>
              </li>
              <li>
                <button onClick={handleLogout} className="text-error">
                  <LogOut size={14} />
                  Déconnexion
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <Link href="/login" className="btn btn-primary btn-sm glow-primary-sm">
            Connexion
          </Link>
        )}
      </div>
    </div>
  );
}
