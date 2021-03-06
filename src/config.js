// Base URL
export const baseUrl = 'https://pixelmirror.me'
// export const baseUrl = ''

// Login
export const loginUrl = baseUrl + '/api/login/'

// Dashboard - Notifications
export const notificationUrl = baseUrl + '/api/notifications/'
export const notificationLookedAt = '/lookedAt'

// Dashboard - Report Generation / Graphs
export const visitorDataUrl = baseUrl + '/api/reports/visitors/chart'
export const loanArchiveDataUrl = baseUrl + '/api/reports/loanArchives/chart'
export const visitorReportDownloadUrl = baseUrl + '/api/reports/visitors'
export const loanUsuageDownloadUrl = baseUrl + '/api/reports/loanArchives'
export const downloadVisitorReport = baseUrl + '/api/reports/visitors'
export const downloadLoanReport = baseUrl + '/api/reports/loanArchives'

// Users
export const staffUrl = baseUrl + '/api/staffs/'
export const rdUrl = baseUrl + '/api/residentdevelopers/'

// Categories
export const categoryUrl = baseUrl + '/api/categories/'
export const categoryTypesUrl = baseUrl + '/api/categoryTypes/'

// Items
export const itemUrl = baseUrl + '/api/items/'

// Loans
export const loanUrl = baseUrl + '/api/loans/'
export const catItemOptionsForLoan = baseUrl + '/api/items/itemOptionsForLoan?sort=category&id='
export const subCatItemOptionsForLoan = baseUrl + '/api/items/itemOptionsForLoan?sort=subcategory&id='
export const loanReturned = '/returnloan'
export const ongoingLoansUrl = baseUrl + '/api/loans/ongoing/'
export const dueLoansUrl = baseUrl + '/api/loans/due/'
export const loanArchiveUrl = baseUrl + '/api/loans/archives/'
export const updateDueDateTimeUrl = '/updateDueDateTime'

// Visitor Count
export const visitPurpose = baseUrl + '/api/visitpurposes/'
export const visitors = baseUrl + '/api/visitors/'

// Options
export const categoriesForOptions = baseUrl + '/api/categories/categoriesForOptions/'
export const subcategoriesForOptions = baseUrl + '/api/categories/subcategoriesForOptions/'
export const staffsForOptions = baseUrl + '/api/staffs/staffsforoptions/'
export const loanOptions = baseUrl + '/api/loanoptions/'
export const userOptions = baseUrl + '/api/users/usersforoptions/'
export const visitPurposesForOptions = baseUrl + '/api/visitPurposes/visitPurposesForOptions/'

// Training
export const trainingUrl = baseUrl + '/api/trainings/'

// Logout
export const logoutUrl = baseUrl + '/api/logout/'

//  For actual production, don't need base url, vue will be part of nodejs program, so '/' will suffice
