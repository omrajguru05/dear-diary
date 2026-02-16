"use client";

import React from "react";
import Link from "next/link";
import {
    format,
    startOfMonth,
    endOfMonth,
    eachDayOfInterval,
    isSameMonth,
    isSameDay,
    addMonths,
    subMonths,
    getDay
} from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface CalendarProps {
    initialDate: Date;
    entries: { entry_date: string; slug: string }[];
}

export function Calendar({ initialDate, entries }: CalendarProps) {
    const [currentDate, setCurrentDate] = React.useState(initialDate);

    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);
    const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

    // 0 is Sunday, 1 is Monday...
    const startingDayIndex = getDay(monthStart);

    const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));
    const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));

    const getEntryForDate = (date: Date) => {
        return entries.find(entry => isSameDay(new Date(entry.entry_date), date));
    };

    return (
        <div className="w-full max-w-sm mx-auto p-6 bg-sand/5 rounded-2xl border border-sand/10 shadow-sm">
            <div className="flex items-center justify-between mb-8">
                <button
                    onClick={prevMonth}
                    className="p-2 hover:bg-sand/20 rounded-full text-taupe hover:text-espresso transition-colors"
                >
                    <ChevronLeft className="w-5 h-5" />
                </button>
                <h2 className="text-xl font-serif font-bold text-espresso tracking-tight">
                    {format(currentDate, "MMMM yyyy")}
                </h2>
                <button
                    onClick={nextMonth}
                    className="p-2 hover:bg-sand/20 rounded-full text-taupe hover:text-espresso transition-colors"
                >
                    <ChevronRight className="w-5 h-5" />
                </button>
            </div>

            <div className="grid grid-cols-7 gap-2 text-center text-xs font-medium text-taupe/60 uppercase tracking-widest mb-4 font-sans">
                {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                    <div key={day}>{day}</div>
                ))}
            </div>

            <div className="grid grid-cols-7 gap-2 font-sans">
                {/* Empty cells for start padding */}
                {Array.from({ length: startingDayIndex }).map((_, i) => (
                    <div key={`empty-${i}`} />
                ))}

                {daysInMonth.map((date) => {
                    const isToday = isSameDay(date, new Date());
                    const entry = getEntryForDate(date);

                    return (
                        <div key={date.toString()} className="relative aspect-square flex items-center justify-center">
                            {entry ? (
                                <Link
                                    href={`/e/${entry.slug}`}
                                    className={cn(
                                        "w-9 h-9 flex items-center justify-center rounded-full transition-all duration-300 text-sm font-medium",
                                        "bg-espresso text-paper hover:bg-cinnamon hover:scale-105 shadow-sm hover:shadow-md",
                                        isToday && "ring-2 ring-cinnamon ring-offset-2 ring-offset-paper"
                                    )}
                                >
                                    {format(date, "d")}
                                </Link>
                            ) : (
                                <span className={cn(
                                    "text-sm text-taupe/30 select-none",
                                    isToday && "font-bold text-cinnamon"
                                )}>
                                    {format(date, "d")}
                                </span>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
