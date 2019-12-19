function PaginationHelper(collection, itemsPerPage) {
    this.collection = collection
    this.itemsPerPage = itemsPerPage
    const result = []
    for (let i = 0; i < this.collection.length; i += itemsPerPage) {
        result.push(this.collection.slice(i, i + itemsPerPage))
    }
    this.paginated = result;
}

PaginationHelper.prototype.itemCount = function () {
    return this.collection.length
}

PaginationHelper.prototype.pageCount = function () {
    return Math.floor((this.collection.length - 1) / this.itemsPerPage) + 1
}

PaginationHelper.prototype.pageItemCount = function (pageIndex) {
    return this.collection.slice(pageIndex * this.itemsPerPage, pageIndex * this.itemsPerPage + this.itemsPerPage).length || -1
}

PaginationHelper.prototype.pageIndex = function (itemIndex) {
    return itemIndex >= 0 && itemIndex < this.itemCount()
        ? Math.floor(itemIndex / this.itemsPerPage)
        : -1
}

module.exports = PaginationHelper;