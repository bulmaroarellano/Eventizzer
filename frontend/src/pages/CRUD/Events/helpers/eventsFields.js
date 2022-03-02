
const eventsFields = {
	id: { type: 'id', label: 'ID' },

    billingId: { type: 'relation_one', label: 'BillingId',

    },

    date: { type: 'datetime', label: 'Date',

    },

    name: { type: 'string', label: 'Name',

    },

    price: { type: 'decimal', label: 'Price',

    },

    address: { type: 'string', label: 'Address',

    },

}

export default eventsFields;
