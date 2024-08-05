<template id="channels-sidebar-button">
    <div @click="buttonClicked">
        <a>
            <span v-if="$state.ui.app_width > 769">{{ $t('channels') }}</span>
            <i v-else class="fa fa-list" aria-hidden="true" :title="$t('channels')" />
        </a>
    </div>
</template>

<script>
/* global kiwi:true */

const chanList = kiwi.require('components/ChannelList');

export default {
    methods: {
        buttonClicked() {
            const network = this.$state.getActiveNetwork();
            if (!network.channel_list.length && network.channel_list_state !== 'updating') {
                network.channel_list_state = 'updating';
                network.ircClient.raw('LIST');
            }
            kiwi.showInSidebar(chanList, { network: network });
        },
    },
};
</script>

<style>
.kiwi-sidebar .kiwi-channellist {
    padding-bottom: 0;
    height: 100%;
}

.kiwi-sidebar .kiwi-channellist-content-container {
    height: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
}

.kiwi-sidebar .kiwi-channellist-padding-top {
    padding-top: 100px;
}

.kiwi-sidebar .kiwi-channellist-nav .u-form .u-input {
    width: 100%;
}

/* Table Styling */
.kiwi-sidebar .kiwi-channellist-table {
    width: 100%;
    height: 100%;
    overflow-y: auto;
}

.kiwi-sidebar .kiwi-channellist-grid {
    grid-template-columns: 66px auto min-content;
}

.kiwi-sidebar .kiwi-channellist-topic {
    grid-column: 1 / span 3;
    grid-row: 2;
    word-break: break-word;
}

.kiwi-sidebar .kiwi-channellist-join {
    grid-column: 3;
}

.kiwi-sidebar .kiwi-channellist-nav:last-of-type {
    display: none;
}
</style>
