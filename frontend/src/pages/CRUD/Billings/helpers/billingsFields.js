
const billingsFields = {
	id: { type: 'id', label: 'ID' },

    client: { type: 'relation_one', label: 'Client',

    },

    product: { type: 'string', label: 'Product',

    },

    price: { type: 'decimal', label: 'Price',

    },

    amount: { type: 'decimal', label: 'Amount',

    },

    subtotal: { type: 'decimal', label: 'Subtotal',

    },

    iva: { type: 'decimal', label: 'Iva',

    },

    discount: { type: 'decimal', label: 'Discount',

    },

    total: { type: 'decimal', label: 'Total',

    },

    payForm: { type: 'string', label: 'PayForm',

    },

}

export default billingsFields;
