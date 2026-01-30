/**
 * Utility functions for the dashboard
 */

/**
 * Format large numbers with commas
 */
export function formatNumber(num: number): string {
    return num.toLocaleString();
}

/**
 * Get severity color based on level
 */
export function getSeverityColor(level: number): string {
    const colors = {
        0: '#10b981', // green
        1: '#3b82f6', // blue
        2: '#f59e0b', // amber
        3: '#f97316', // orange
        4: '#ef4444', // red
    };
    return colors[level as keyof typeof colors] || '#6b7280';
}

/**
 * Get severity label
 */
export function getSeverityLabel(level: number): string {
    const labels = {
        0: 'Minimal',
        1: 'Low',
        2: 'Medium',
        3: 'High',
        4: 'Critical',
    };
    return labels[level as keyof typeof labels] || 'Unknown';
}

/**
 * Truncate text with ellipsis
 */
export function truncate(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
}

/**
 * Calculate percentage
 */
export function percentage(value: number, total: number): string {
    if (total === 0) return '0';
    return ((value / total) * 100).toFixed(1);
}

/**
 * Format date
 */
export function formatDate(timestamp: number): string {
    return new Date(timestamp).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
}

/**
 * Get month name
 */
export function getMonthName(month: number): string {
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return months[month - 1] || '';
}

/**
 * Debounce function
 */
export function debounce<T extends (...args: any[]) => any>(
    func: T,
    wait: number
): (...args: Parameters<T>) => void {
    let timeout: NodeJS.Timeout;
    return (...args: Parameters<T>) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
}

/**
 * Class name helper
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
    return classes.filter(Boolean).join(' ');
}
