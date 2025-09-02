import { useState, useEffect } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const useCountdown = (targetDate: Date): TimeLeft => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const target = targetDate.getTime();
      const difference = target - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    // Calculate immediately
    calculateTimeLeft();

    // Update every second
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return timeLeft;
};

// Simple days-only countdown hook for better reliability
export const useDaysCountdown = (): number => {
  const [daysLeft, setDaysLeft] = useState<number>(0);

  useEffect(() => {
    const calculateDaysLeft = () => {
      // Target: A realistic future date for urgency
      // Using December 31st, 2025 as target date (end of year urgency)
      const targetDate = new Date('2025-12-31T23:59:59Z');
      const today = new Date();
      
      // Reset time to midnight for accurate day calculation
      today.setHours(0, 0, 0, 0);
      const targetMidnight = new Date(targetDate);
      targetMidnight.setHours(0, 0, 0, 0);
      
      const timeDifference = targetMidnight.getTime() - today.getTime();
      const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
      
      setDaysLeft(Math.max(0, daysDifference));
    };

    // Calculate immediately
    calculateDaysLeft();

    // Update every hour to ensure accuracy
    const timer = setInterval(calculateDaysLeft, 1000 * 60 * 60);

    return () => clearInterval(timer);
  }, []);

  return daysLeft;
};
