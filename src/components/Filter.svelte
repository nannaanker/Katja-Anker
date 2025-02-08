<script>
  export let data = [];
  let filteredData = data.filter((item) => item.category === "illustrationer");

  let modalGallery = [];
  let currentImageIndex = 0;
  let showModal = false;
  let activeItemId = null;
  let selectedItem = null; // Gemmer det valgte item

  const filterByCategory = (category) => {
    filteredData = data.filter((item) => item.category === category);
  };

  const openModal = (item, gallery, index = 0) => {
    selectedItem = item; // Gem det valgte item
    modalGallery = gallery;
    currentImageIndex = index;
    showModal = true;
  };

  const closeModal = () => {
    showModal = false;
    modalGallery = [];
    currentImageIndex = 0;
    selectedItem = null; // Nulstil
  };
</script>

<div class="">
  <!-- Navigationsmenu -->
  <nav class="mb-7 mt-3 flex flex-col md:flex-row gap-2 md:gap-10 text-rod text-base md:text-base font-elza font-medium justify-center md:mt-12">
    <button class="hover:underline underline md:no-underline hover:scale-105 focus:underline" x-text="translations[lang].illustration" on:click={() => filterByCategory("illustrationer")}> Illustrationer</button>
    <button class="hover:underline underline md:no-underline hover:scale-105 focus:underline" x-text="translations[lang].teaching" on:click={() => filterByCategory("undervisning")}>Undervisning</button>
    <button class="hover:underline underline md:no-underline hover:scale-105 focus:underline" x-text="translations[lang].fieldTrips" on:click={() => filterByCategory("feltture")}>Botaniske feltture</button>
  </nav>

  <!-- Indhold -->
  <div class="flex flex-wrap gap-5 justify-center md:mx-20 mb-32">
    {#each filteredData as item (item.id)}
      <div class="relative group flex flex-col justify-center items-center w-80 h-80 bg-white">
        <!-- Billedet -->

        <div class="flex flex-col items-center w-5/6 h-5/6">
          <img class="w-auto max-w-full m-auto max-h-full p-4" src={(item.gallery || [item.img])[item.currentPreviewIndex || 0]} alt={item.alt} />
        </div>

        <button on:click={() => openModal(item, item.gallery || [item.img], item.currentPreviewIndex || 0)} class="absolute bottom-2 right-4 text-base md:text-sm font-elza font-medium text-rod hover:scale-105">
          <span class="ml-1" x-text="translations[lang].info"></span>
          &rarr; <!-- Pilen til venstre -->
        </button>
      </div>
    {/each}
  </div>

  <!-- Modal -->
  {#if showModal}
    <div class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div class="relative bg-white p-7 w-[400px] h-[500px] sm:w-[1000px] sm:h-[700px] flex flex-col md:flex-row gap-2 items-center justify-center">
        <button on:click={closeModal} class="absolute top-5 right-5 text-rod hover:scale-105 text-2xl cursor-pointer flex items-center justify-center"> ✕ </button>
        {#if modalGallery.length > 1}
          <button class="absolute left-5 top-1/2 transform -translate-y-1/2 font-elza bg-black bg-opacity-20 text-white hover:text-rod hover:scale-105 px-4 py-2 rounded" on:click={() => (currentImageIndex = (currentImageIndex - 1 + modalGallery.length) % modalGallery.length)}> &larr; </button>
        {/if}
        <img src={modalGallery[currentImageIndex]} alt="forstørret billed" class="max-w-full max-h-full m-0" />
        {#if modalGallery.length > 1}
          <button class="absolute right-5 top-1/2 transform -translate-y-1/2 font-elza bg-black bg-opacity-20 text-white hover:text-rod hover:scale-105 px-4 py-2 rounded" on:click={() => (currentImageIndex = (currentImageIndex + 1) % modalGallery.length)}> &rarr; </button>
        {/if}

        <div class="w-[20%]">
          <p class="font-elza font-regular">{selectedItem ? selectedItem.info : "Ingen info tilgængelig"}</p>
        </div>
      </div>
    </div>
  {/if}
</div>
