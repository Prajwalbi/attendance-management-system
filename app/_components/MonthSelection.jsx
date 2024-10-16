"use client"  // Marks this component as a Client Component in Next.js to enable state and lifecycle hooks.

import React, { useState } from 'react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"  // Import UI components for the popover from your design system.
import { Button, Label, Input } from '@/components/ui/button'  // Import Button and other UI elements.
import { CalendarDays } from 'lucide-react'  // Import an icon for the calendar.
import { addMonths } from 'date-fns';  // A utility function to manipulate dates.
import moment from 'moment'  // Import Moment.js for formatting the date.
import { Calendar } from "@/components/ui/calendar"  // Import Calendar component from your design system.

function MonthSelection({ selectedMonth }) {
    // 'selectedMonth' is a prop passed from the parent component, used to send the selected month back.

    const today = new Date();  // Get the current date.
    const curMonth = addMonths(new Date(), 0);  // Set the current month using 'addMonths' (0 means no change).
    const [month, setMonth] = useState(curMonth);  // Initialize the state for storing the selected month.
    
    return (
        <div>
            {/* Popover allows displaying a calendar when the button is clicked */}
            <Popover>
                {/* Button that triggers the popover with an icon and the current month */}
                <PopoverTrigger asChild>
                    <Button variant="outline" className="flex gap-2 items-center text-slate-500">
                        <CalendarDays className='h-5 w-5' />  {/* Calendar icon next to the button */}
                        {moment(month).format('MMM yyyy')}  {/* Display the current month in 'MMM yyyy' format */}
                    </Button>
                </PopoverTrigger>
                {/* Content that displays when the popover is triggered */}
                <PopoverContent>
                    <Calendar
                        mode="single"  // Calendar mode is set to single, allowing selection of one month at a time.
                        month={month}  // The currently selected month is displayed.
                        onMonthChange={(value) => {
                            selectedMonth(value);  // Pass the selected month back to the parent component via the prop.
                            setMonth(value);  // Update the local state with the newly selected month.
                        }}
                        className="flex flex-1 justify-center"  // Center the calendar inside the popover.
                    />        
                </PopoverContent>
            </Popover>
        </div>
    )
}

export default MonthSelection;
