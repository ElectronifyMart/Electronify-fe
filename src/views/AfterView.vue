<template>
    <div class="flex items-center justify-center min-h-screen bg-gray-100">
        <div class="space-y-4">
            <div class="flex space-x-6">
                <button @click="showNotification('You Want Logout.')"
                    class="w-48 px-6 py-3 text-lg text-white bg-red-500 rounded-lg shadow-md hover:bg-red-600 transition">
                    Log-out
                </button>
                <button @click="showNotification('Moving to the next step.')"
                    class="w-48 px-6 py-3 text-lg text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 transition">
                    Next
                </button>
            </div>

            <transition name="fade-slide">
                <div v-if="notification"
                    class="fixed top-5 right-5 max-w-sm w-full bg-white border-l-4 border-blue-500 shadow-lg rounded-md p-4 animate-fade-in">
                    <div class="flex items-center space-x-4">
                        <div class="w-10 h-10 bg-blue-500 text-white flex items-center justify-center rounded-full">
                            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M13 16h-1v-4h-1m1-4h.01M12 18.5c-.394 0-.786-.055-1.17-.162-.384-.107-.745-.265-1.078-.468-.334-.202-.637-.444-.9-.72-.264-.275-.485-.586-.66-.927-.175-.341-.302-.713-.376-1.102-.074-.39-.1-.796-.08-1.203.02-.407.086-.81.2-1.2.115-.39.272-.755.464-1.092.192-.338.419-.642.672-.904.253-.263.536-.482.84-.648.304-.165.625-.28.954-.34.329-.06.667-.075 1-.045h1.5" />
                            </svg>
                        </div>
                        <div>
                            <p class="text-lg font-semibold text-gray-800">{{ notification }}</p>
                            <p class="text-sm text-gray-600">Masih dalam perbaikan belum selesai.</p>
                        </div>
                    </div>
                </div>
            </transition>
        </div>
    </div>
</template>

<script>
export default {
    name: "NotificationBox",
    data() {
        return {
            notification: null,
        };
    },
    methods: {
        showNotification(message) {
            this.notification = message;
            setTimeout(() => {
                this.notification = null;
            }, 3000); // Hide notification after 3 seconds
        },
    },
};
</script>
