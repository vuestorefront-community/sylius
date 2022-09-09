<template>
  <div>
    <SfAddressPicker
      @change="setCurrentAddress($event)"
      class="billing__addresses"
    >
      <SfAddress
        v-for="billingAddress in billingAddresses"
        :key="addressGetters.getId(billingAddress)"
        :name="String(addressGetters.getId(billingAddress))"
        class="billing__address"
      >
        <span
          >{{ addressGetters.getFirstName(billingAddress) }} {{ addressGetters.getLastName(billingAddress) }}</span
        >
        <span
          >{{ addressGetters.getStreetName(billingAddress) }}
          {{ addressGetters.getApartmentNumber(billingAddress) }}</span
        >
        <span>{{ addressGetters.getPostCode(billingAddress) }}</span>
        <span
          >{{ addressGetters.getCity(billingAddress)
          }}{{ addressGetters.getProvince(billingAddress) ? `, ${addressGetters.getProvince(billingAddress)}` : '' }}</span
        >
        <span>{{ addressGetters.getCountry(billingAddress)}}</span>
        <span>{{ addressGetters.getPhone(billingAddress) }}</span>
      </SfAddress>
    </SfAddressPicker>
  </div>
</template>

<script>
import {
  SfAddressPicker
} from '@storefront-ui/vue';
export default {
  name: 'UserAddresses',
  props: {
    addresses: {
      type: Array,
      required: true
    },
    addressGetters: {
      type: Object,
      required: true
    }
  },
  components: {
    SfAddressPicker
  },
  setup (props, { emit }) {
    const setCurrentAddress = async addressId => {
      const selectedAddress = props.addressGetters.getAddresses(props.addresses, { id: addressId });
      if (!selectedAddress || !selectedAddress.length) return;
      emit('setCurrentAddress', selectedAddress[0]);
    };
    return {
      billingAddresses: props.addressGetters.getAddresses(props.addresses),
      setCurrentAddress
    };
  }
};
</script>

<style lang="scss" scoped>
  .billing {
    &__address {
      margin-bottom: var(--spacer-base);
      @include for-desktop {
        margin-right: var(--spacer-sm);
        flex: 1;
      }
    }
    &__addresses {
      margin-bottom: var(--spacer-xl);
      @include for-desktop {
        display: flex;
        flex-wrap: wrap;
      }
    }
    &__setAsDefault {
      margin-bottom: var(--spacer-xl);
    }
  }
</style>
