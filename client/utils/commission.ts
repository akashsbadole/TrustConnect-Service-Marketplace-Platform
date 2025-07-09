// Commission structure: 8% to platform owner, 92% to professional
export const COMMISSION_CONFIG = {
  PLATFORM_COMMISSION_RATE: 0.08, // 8%
  PROVIDER_RATE: 0.92, // 92%
  PAYMENT_PROCESSING_FEE: 0.029, // 2.9% for Stripe
  FIXED_FEE: 0.3, // $0.30 fixed fee
} as const;

export interface CommissionBreakdown {
  totalAmount: number;
  platformCommission: number;
  paymentProcessingFee: number;
  fixedFee: number;
  providerAmount: number;
  netProviderAmount: number;
}

/**
 * Calculate commission breakdown for a booking
 * @param totalAmount - Total booking amount
 * @returns Detailed commission breakdown
 */
export function calculateCommission(totalAmount: number): CommissionBreakdown {
  // Platform commission (8% of total)
  const platformCommission =
    totalAmount * COMMISSION_CONFIG.PLATFORM_COMMISSION_RATE;

  // Payment processing fees (calculated on gross amount)
  const paymentProcessingFee =
    totalAmount * COMMISSION_CONFIG.PAYMENT_PROCESSING_FEE;
  const fixedFee = COMMISSION_CONFIG.FIXED_FEE;

  // Provider gets 92% minus payment processing fees
  const providerAmount = totalAmount * COMMISSION_CONFIG.PROVIDER_RATE;
  const netProviderAmount = providerAmount - paymentProcessingFee - fixedFee;

  return {
    totalAmount,
    platformCommission,
    paymentProcessingFee,
    fixedFee,
    providerAmount,
    netProviderAmount,
  };
}

/**
 * Calculate provider earnings for display
 * @param bookingAmount - Booking amount
 * @returns Provider earnings after commission
 */
export function calculateProviderEarnings(bookingAmount: number): number {
  const breakdown = calculateCommission(bookingAmount);
  return breakdown.netProviderAmount;
}

/**
 * Calculate platform revenue
 * @param bookingAmount - Booking amount
 * @returns Platform commission earnings
 */
export function calculatePlatformRevenue(bookingAmount: number): number {
  const breakdown = calculateCommission(bookingAmount);
  return (
    breakdown.platformCommission +
    breakdown.paymentProcessingFee +
    breakdown.fixedFee
  );
}

/**
 * Format commission breakdown for display
 * @param totalAmount - Total booking amount
 * @returns Formatted breakdown object
 */
export function formatCommissionBreakdown(totalAmount: number) {
  const breakdown = calculateCommission(totalAmount);

  return {
    total: `$${totalAmount.toFixed(2)}`,
    platformCommission: `$${breakdown.platformCommission.toFixed(2)} (8%)`,
    paymentFees: `$${(breakdown.paymentProcessingFee + breakdown.fixedFee).toFixed(2)}`,
    providerAmount: `$${breakdown.providerAmount.toFixed(2)} (92%)`,
    netProviderAmount: `$${breakdown.netProviderAmount.toFixed(2)}`,
    breakdown: {
      ...breakdown,
      platformCommissionPercent: (
        (breakdown.platformCommission / totalAmount) *
        100
      ).toFixed(1),
      providerPercent: ((breakdown.providerAmount / totalAmount) * 100).toFixed(
        1,
      ),
    },
  };
}

/**
 * Calculate total cost including platform commission (for provider pricing)
 * @param providerRate - Provider's desired hourly/service rate
 * @param hours - Number of hours (default 1 for service-based pricing)
 * @returns Total cost customer will pay
 */
export function calculateCustomerCost(
  providerRate: number,
  hours: number = 1,
): number {
  const providerAmount = providerRate * hours;
  // Calculate total amount needed so provider gets their desired rate
  // providerAmount = totalAmount * 0.92
  // totalAmount = providerAmount / 0.92
  const totalAmount = providerAmount / COMMISSION_CONFIG.PROVIDER_RATE;
  return totalAmount;
}

/**
 * Validate commission calculations
 * @param totalAmount - Total booking amount
 * @returns Boolean indicating if calculations are valid
 */
export function validateCommission(totalAmount: number): boolean {
  const breakdown = calculateCommission(totalAmount);
  const sum =
    breakdown.platformCommission +
    breakdown.netProviderAmount +
    breakdown.paymentProcessingFee +
    breakdown.fixedFee;

  // Allow for small rounding differences (within 1 cent)
  return Math.abs(sum - totalAmount) < 0.01;
}

// Commission reporting helpers
export interface CommissionReport {
  totalBookings: number;
  totalRevenue: number;
  platformEarnings: number;
  providerEarnings: number;
  paymentFees: number;
  averageCommission: number;
}

/**
 * Generate commission report from booking data
 * @param bookings - Array of booking amounts
 * @returns Commission report
 */
export function generateCommissionReport(bookings: number[]): CommissionReport {
  const totalBookings = bookings.length;
  const totalRevenue = bookings.reduce((sum, amount) => sum + amount, 0);

  let platformEarnings = 0;
  let providerEarnings = 0;
  let paymentFees = 0;

  bookings.forEach((amount) => {
    const breakdown = calculateCommission(amount);
    platformEarnings += breakdown.platformCommission;
    providerEarnings += breakdown.netProviderAmount;
    paymentFees += breakdown.paymentProcessingFee + breakdown.fixedFee;
  });

  return {
    totalBookings,
    totalRevenue,
    platformEarnings,
    providerEarnings,
    paymentFees,
    averageCommission: totalBookings > 0 ? platformEarnings / totalBookings : 0,
  };
}
