"use client";

import { useState, useRef, useEffect, ChangeEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Countdown() {
    const [duration, setDuration] = useState<number | string>("");
    const [timeLeft, setTimeLeft] = useState<number>(0);
    const [isActive, setIsActive] = useState<boolean | string>(false);
    const [isPaused, setIsPaused] = useState<boolean>(false);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const handleSetDuration = (): void => {
        if (typeof duration === "number" && duration > 0) {
            setIsActive(false);
            setIsPaused(false);
            setTimeLeft(duration);
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }

        }
    };

    const handleStart = (): void => {
        if (timeLeft > 0) {
            setIsActive(true);
            setIsPaused(false);
        }

    };

    const handlePause = (): void => {
        if (isActive) {
            setIsPaused(true);
            setIsActive(false);
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        }
    };

    const handleReset = (): void => {
        setIsActive(false);
        setIsPaused(false);
        setTimeLeft(typeof duration === "number" ? duration : 0);
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }
    };

    useEffect(() => {
        if (isActive && !isPaused) {
            timerRef.current = setInterval(() => {
                setTimeLeft((prevTime) => {
                    if (prevTime <= 1) {
                        clearTimeout(timerRef.current!);
                        return 0;
                    }
                    return prevTime - 1;
                });
            }, 1000);
        }
        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    }, [isActive, isPaused]);

    const formatTime = (time: number): string => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    };

    const handleDurationChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setDuration(Number(e.target.value) || "");
    };

    return (
        <div className="flex flex-col items-center justify-center drop-shadow-lg p-6 bg-gray-800 text-white rounded-3xl  w-1/3 max-w-md">
            <h2 className="text-4xl font-bold mb-4">Countdown Timer</h2>
            <div className="mb-4">
                <Input
                    type="number"
                    value={duration}
                    onChange={handleDurationChange}
                    placeholder="Enter duration in seconds"
                    className=" m-3 p-6  rounded text-white"
                />
                <Button 
                onClick={handleSetDuration}  
                className="ml-16 mt-3 bg-blue-500 hover:bg-blue-600 rounded-xl text-white">
                    Set Duration
                </Button>
            </div>
            <div 
            className="text-5xl font-bold mb-5">{formatTime(timeLeft)}
            </div>
            <div className="flex space-x-5">
                <Button onClick={handleStart} className="bg-green-500 hover:bg-green-600 text-white">
                    Start
                </Button>
                <Button onClick={handlePause} className="bg-yellow-500 hover:bg-yellow-600 text-white">
                    Pause
                </Button>
                <Button onClick={handleReset} className="bg-red-500 hover:bg-red-600 text-white">
                    Reset
                </Button>
            </div>
        </div>
    );
}

    