//Extend Date
interface Date {
    /**
     * Format a Date to string, pattern is below:
     * @param pattern - format string, like `"YYYY-MM-DD hh:mm:ss"`
     * 大写表示日期，小写一律表示时间，两位表示有前导0，一位表示无前导0
     * Uppercase represents date, lowsercase represents time
     * double char represents with prefix '0', single char represents without prefix '0'
     * Examples:
     * - YYYY/yyyy/YY/yy: year
     * - MM/M: month
     * - DD/D/dd/d: day
     * - HH/H/hh/h: hour(24)
     * - mm/m: minute
     * - ss/s: second
     * - Q/QQ: quater
     */
    format: (pattern?: string) => string;
}

interface DateConstructor {
    today(): number;
}