
const ordersFields = {
	id: { type: 'id', label: 'ID' },

    quantity: { type: 'int', label: 'Quantity',

    },

    discount: { type: 'decimal', label: 'Discount',

    },

    totalPrice: { type: 'int', label: 'TotalPrice',

    },

    customer: { type: 'relation_one', label: 'Customer',

    },

    product: { type: 'relation_one', label: 'Product',

    },

}

export default ordersFields;
