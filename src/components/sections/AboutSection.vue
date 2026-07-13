<script setup lang="ts">
import { useTemplateRef } from 'vue'
import { useI18n } from 'vue-i18n'

import FactCard from '@/components/ui/FactCard.vue'
import SectionTitle from '@/components/ui/SectionTitle.vue'
import SkillsList from '@/components/ui/SkillsList.vue'
import { useInView } from '@/composables/useInView'
import { facts } from '@/data/facts'
import { profile } from '@/data/profile'

const { t } = useI18n()

const factsRow = useTemplateRef<HTMLDivElement>('factsRow')
const factsVisible = useInView(factsRow)
</script>

<template>
  <section id="about">
    <div class="container">
      <SectionTitle :title="t('about.title')" />

      <div class="row">
        <div class="col-md-3">
          <div class="avatar-col">
            <img :src="profile.avatarAbout" :alt="t('hero.name')" width="150" height="150" />
          </div>
        </div>

        <div class="col-md-9 triangle-left-md triangle-top-sm">
          <div class="about-card rounded bg-white shadow-dark padding-30">
            <div class="row">
              <div class="col-md-6 bio-col">
                <p>{{ t('about.bio') }}</p>
                <a href="#" class="btn btn-default">{{ t('about.downloadCv') }}</a>
              </div>
              <div class="col-md-6">
                <SkillsList />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div ref="factsRow" class="row facts-row">
        <div v-for="fact in facts" :key="fact.id" class="col-md-3 col-sm-6 fact-col">
          <FactCard :fact="fact" :active="factsVisible" />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.avatar-col {
  text-align: center;

  @include media-up(md) {
    text-align: left;
  }

  @include media-down(md) {
    margin-bottom: 30px;
  }
}

.bio-col {
  p {
    margin-top: 0;
  }

  .btn {
    margin-top: 1rem;
  }

  @include media-down(md) {
    margin-bottom: 30px;
  }
}

.facts-row {
  margin-top: 70px;
}

@include media-down(md) {
  .fact-col:not(:last-child) {
    margin-bottom: 30px;
  }
}
</style>
