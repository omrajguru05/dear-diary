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
    entries: { entry_date: string }[];
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

    const hasEntry = (date: Date) => {
        return entries.some(entry => isSameDay(new Date(entry.entry_date), date));
    };

    return (
        <div className="w-full max-w-sm mx-auto p-4 bg-paper rounded-lg">
            <div className="flex items-center justify-between mb-8">
                <button
                    onClick={prevMonth}
                    className="p-2 hover:bg-sand/30 rounded-full text-taupe transition-colors"
                >
                    <ChevronLeft className="w-5 h-5" />
                </button>
                <h2 className="text-xl font-serif font-bold text-espresso">
                    {format(currentDate, "MMMM yyyy")}
                </h2>
                <button
                    onClick={nextMonth}
                    className="p-2 hover:bg-sand/30 rounded-full text-taupe transition-colors"
                >
                    <ChevronRight className="w-5 h-5" />
                </button>
            </div>

            <div className="grid grid-cols-7 gap-2 text-center text-xs font-medium text-taupe/50 uppercase tracking-wider mb-4">
                {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                    <div key={day}>{day}</div>
                ))}
            </div>

            <div className="grid grid-cols-7 gap-2">
                {/* Empty cells for start padding */}
                {Array.from({ length: startingDayIndex }).map((_, i) => (
                    <div key={`empty-${i}`} />
                ))}

                {daysInMonth.map((date) => {
                    const isToday = isSameDay(date, new Date());
                    const entryExists = hasEntry(date);

                    return (
                        <div key={date.toString()} className="relative aspect-square flex items-center justify-center">
                            {entryExists ? (
                                <Link
                                    href={`/post/${format(date, "yyyy-MM-dd")}`}
                                    className={cn(
                                        "w-8 h-8 flex items-center justify-center rounded-full transition-all text-sm font-medium",
                                        "bg-espresso text-paper hover:bg-cinnamon hover:scale-110 shadow-sm",
                                        isToday && "ring-2 ring-cinnamon ring-offset-2 ring-offset-paper"
                                    )}
                                >
                                    {format(date, "d")}
                                </Link>
                            ) : (
                                <span className={cn(
                                    "text-sm text-taupe/40",
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
