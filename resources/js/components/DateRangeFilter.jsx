import React, { useState, useRef, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function DateRangeFilter({ onFilter, defaultStartDate = '', defaultEndDate = '' }) {
    const [showCalendar, setShowCalendar] = useState(false);
    const [startDate, setStartDate] = useState(defaultStartDate ? new Date(defaultStartDate) : null);
    const [endDate, setEndDate] = useState(defaultEndDate ? new Date(defaultEndDate) : null);
    const [tempStartDate, setTempStartDate] = useState(defaultStartDate ? new Date(defaultStartDate) : null);
    const [tempEndDate, setTempEndDate] = useState(defaultEndDate ? new Date(defaultEndDate) : null);
    const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
    const calendarRef = useRef(null);
    const buttonRef = useRef(null);

    // Update dropdown position when showing calendar
    useEffect(() => {
        if (showCalendar && buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect();
            const dropdownWidth = 680;
            const dropdownHeight = 500; // Estimasi tinggi dropdown
            
            let left = rect.right - dropdownWidth + window.scrollX;
            let top = rect.bottom + window.scrollY + 8;
            
            // Check if dropdown goes beyond right edge
            if (left < 10) {
                left = 10;
            }
            
            // Check if dropdown goes beyond bottom of viewport
            if (rect.bottom + dropdownHeight > window.innerHeight) {
                // Position above the button instead
                top = rect.top + window.scrollY - dropdownHeight - 8;
                
                // If still not enough space, just position below with scroll
                if (top < 10) {
                    top = rect.bottom + window.scrollY + 8;
                }
            }
            
            setDropdownPosition({ top, left });
        }
    }, [showCalendar]);

    // Close calendar when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (calendarRef.current && !calendarRef.current.contains(event.target) && 
                buttonRef.current && !buttonRef.current.contains(event.target)) {
                setShowCalendar(false);
            }
        };

        if (showCalendar) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showCalendar]);

    const handleApply = () => {
        setStartDate(tempStartDate);
        setEndDate(tempEndDate);
        setShowCalendar(false);
        
        if (onFilter) {
            onFilter({
                startDate: tempStartDate ? tempStartDate.toISOString().split('T')[0] : '',
                endDate: tempEndDate ? tempEndDate.toISOString().split('T')[0] : ''
            });
        }
    };

    const handleReset = () => {
        setTempStartDate(null);
        setTempEndDate(null);
        setStartDate(null);
        setEndDate(null);
        setShowCalendar(false);
        
        if (onFilter) {
            onFilter({
                startDate: '',
                endDate: ''
            });
        }
    };

    const handleQuickFilter = (days) => {
        const end = new Date();
        const start = new Date();
        
        if (days === 0) {
            // Hari ini
            start.setHours(0, 0, 0, 0);
            end.setHours(23, 59, 59, 999);
        } else if (days === -1) {
            // Bulan ini
            start.setDate(1);
            start.setHours(0, 0, 0, 0);
            end.setHours(23, 59, 59, 999);
        } else {
            // X hari terakhir
            start.setDate(end.getDate() - days + 1);
            start.setHours(0, 0, 0, 0);
            end.setHours(23, 59, 59, 999);
        }
        
        setTempStartDate(start);
        setTempEndDate(end);
    };

    const formatDisplayDate = (start, end) => {
        if (!start && !end) return 'Pilih Rentang Tanggal';
        if (!start) return `Sampai ${end.toLocaleDateString('id-ID')}`;
        if (!end) return `Dari ${start.toLocaleDateString('id-ID')}`;
        return `${start.toLocaleDateString('id-ID')} - ${end.toLocaleDateString('id-ID')}`;
    };

    return (
        <div className="relative">
            {/* Filter Button */}
            <button
                ref={buttonRef}
                onClick={() => setShowCalendar(!showCalendar)}
                className="inline-flex items-center px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm"
            >
                <svg className="w-5 h-5 mr-2 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {formatDisplayDate(startDate, endDate)}
                </span>
                {(startDate || endDate) && (
                    <span className="ml-2 w-2 h-2 bg-blue-600 rounded-full"></span>
                )}
            </button>

            {/* Calendar Dropdown */}
            {showCalendar && (
                <>
                    {/* Backdrop */}
                    <div 
                        className="fixed inset-0 bg-black/50 z-[90]"
                        onClick={() => setShowCalendar(false)}
                    />
                    
                    {/* Modal/Dropdown */}
                    <div 
                        ref={calendarRef}
                        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[680px] bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 z-[100] max-h-[90vh] overflow-y-auto"
                    >
                        <div className="p-4">
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                                    Filter Rentang Tanggal
                                </h3>
                                <button
                                    onClick={() => setShowCalendar(false)}
                                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            {/* Date Pickers with Calendar - Side by Side */}
                            <div className="grid grid-cols-2 gap-3 mb-3">
                            <div>
                                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Tanggal Mulai
                                </label>
                                <DatePicker
                                    selected={tempStartDate}
                                    onChange={(date) => setTempStartDate(date)}
                                    selectsStart
                                    startDate={tempStartDate}
                                    endDate={tempEndDate}
                                    maxDate={tempEndDate || new Date()}
                                    dateFormat="dd/MM/yyyy"
                                    placeholderText="Pilih tanggal mulai"
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                                    calendarClassName="dark:bg-gray-800"
                                    inline
                                    showMonthDropdown
                                    showYearDropdown
                                    dropdownMode="select"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Tanggal Akhir
                                </label>
                                <DatePicker
                                    selected={tempEndDate}
                                    onChange={(date) => setTempEndDate(date)}
                                    selectsEnd
                                    startDate={tempStartDate}
                                    endDate={tempEndDate}
                                    minDate={tempStartDate}
                                    maxDate={new Date()}
                                    dateFormat="dd/MM/yyyy"
                                    placeholderText="Pilih tanggal akhir"
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                                    calendarClassName="dark:bg-gray-800"
                                    inline
                                    showMonthDropdown
                                    showYearDropdown
                                    dropdownMode="select"
                                />
                            </div>
                        </div>

                        {/* Quick Filters */}
                        <div className="mb-3">
                            <p className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Filter Cepat
                            </p>
                            <div className="grid grid-cols-4 gap-2">
                                <button
                                    onClick={() => handleQuickFilter(0)}
                                    className="px-2 py-1.5 text-xs bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded text-gray-700 dark:text-gray-300 transition-colors"
                                >
                                    Hari Ini
                                </button>
                                <button
                                    onClick={() => handleQuickFilter(7)}
                                    className="px-2 py-1.5 text-xs bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded text-gray-700 dark:text-gray-300 transition-colors"
                                >
                                    7 Hari Terakhir
                                </button>
                                <button
                                    onClick={() => handleQuickFilter(30)}
                                    className="px-2 py-1.5 text-xs bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded text-gray-700 dark:text-gray-300 transition-colors"
                                >
                                    30 Hari Terakhir
                                </button>
                                <button
                                    onClick={() => handleQuickFilter(-1)}
                                    className="px-2 py-1.5 text-xs bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded text-gray-700 dark:text-gray-300 transition-colors"
                                >
                                    Bulan Ini
                                </button>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center justify-end space-x-2 pt-3 border-t border-gray-200 dark:border-gray-700">
                            <button
                                onClick={handleReset}
                                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                            >
                                Reset
                            </button>
                            <button
                                onClick={handleApply}
                                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                            >
                                Terapkan
                            </button>
                        </div>
                    </div>
                    </div>
                </>
            )}
        </div>
    );
}
