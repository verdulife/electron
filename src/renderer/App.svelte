<script lang="ts">
  import "verdu/fonts/circular.css";
  import "verdu/fonts/operator.css";
  import { message } from "@common/util";
  import Message from "@lib/Message.svelte";
</script>

<main class="col fcenter fill">
  <Message {message} />
</main>

<style lang="scss">
  :global {
    @import "./_reset.scss";
    @import "verdu/verdu.scss";
  }
</style>
