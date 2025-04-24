"use strict"
Object.defineProperty(exports, "__esModule", { value: true })
exports.paginate = void 0
const paginate = (page = 1, limit = 10, totalData = 0) => {
  const take = limit
  const skip = (page - 1) * limit
  const totalPages = Math.ceil(totalData / limit)
  return {
    skip,
    take,
    pagination: {
      currentPage: page,
      totalPages: totalPages || 1,
      totalData,
      limit,
    },
  }
}
exports.paginate = paginate
//# sourceMappingURL=pagination.js.map
