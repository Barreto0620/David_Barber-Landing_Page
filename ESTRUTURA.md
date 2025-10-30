# Estrutura do Projeto - David Barber Landing Page

## Visão Geral da Reestruturação

Este documento descreve a nova organização profissional dos componentes do projeto, implementada para melhorar a manutenibilidade e escalabilidade.

## Mudanças Principais

### Antes
- **Header.tsx**: arquivo único com 1143 linhas contendo todos os componentes
- Arquivos não utilizados no projeto (DialogManager.tsx, RealtimeStatus.tsx)
- Falta de organização por funcionalidade

### Depois
- Componentes separados por responsabilidade
- Estrutura de pastas organizada por funcionalidade
- Código mais limpo e fácil de manter

## Nova Estrutura de Componentes

```
src/components/
├── booking/                          # Componentes de agendamento
│   ├── BookingModal.tsx             # Modal principal de agendamento
│   ├── ServiceSelector.tsx          # Seletor de serviços
│   ├── ProfessionalSelector.tsx     # Seletor de profissionais
│   ├── DateSelector.tsx             # Calendário de seleção de data
│   ├── TimeSelector.tsx             # Seletor de horários
│   ├── types.ts                     # Tipos TypeScript compartilhados
│   └── index.ts                     # Barrel exports
│
├── layout/                          # Componentes de layout
│   └── header/
│       ├── Header.tsx               # Header principal (simplificado)
│       ├── DesktopNav.tsx           # Navegação desktop
│       ├── MobileNav.tsx            # Navegação mobile
│       ├── HeaderActions.tsx        # Botões de ação (Ligar, Reservar)
│       └── index.ts                 # Barrel exports
│
├── shared/                          # Componentes compartilhados
│   ├── GlobalStyles.tsx             # Estilos globais (scrollbar, animações)
│   ├── SuccessToast.tsx             # Toast de sucesso
│   └── index.ts                     # Barrel exports
│
└── ... (outros componentes existentes)
```

## Componentes Criados

### 1. Componentes de Booking (`/booking`)

#### BookingModal.tsx
- Modal principal com fluxo de 3 etapas
- Gerencia estado de serviço, profissional, data, horário e dados do cliente
- Validação de formulários integrada

#### ServiceSelector.tsx
- Exibe lista de serviços disponíveis
- Cards clicáveis com informações de preço e duração

#### ProfessionalSelector.tsx
- Lista profissionais disponíveis
- Seleção automática quando há apenas um profissional
- Tratamento especial para "David Sousa"

#### DateSelector.tsx
- Calendário interativo com navegação entre meses
- Bloqueia datas passadas
- Destaca dia atual e fins de semana

#### TimeSelector.tsx
- Seletor de horários disponíveis
- Integração com Supabase para verificar conflitos
- Considera duração dos serviços ao bloquear slots

### 2. Componentes de Layout (`/layout/header`)

#### Header.tsx
- Componente simplificado (de 1143 para ~90 linhas)
- Coordena navegação e modal de booking
- Gerencia scroll suave e menu mobile

#### DesktopNav.tsx
- Menu de navegação para telas grandes
- Links para Início, Serviços, Equipe e Contato

#### MobileNav.tsx
- Menu dropdown para dispositivos móveis
- Fecha automaticamente após navegação

#### HeaderActions.tsx
- Botões de ação (Ligar, Reservar, Login)
- Versões desktop e mobile

### 3. Componentes Compartilhados (`/shared`)

#### GlobalStyles.tsx
- Estilos customizados de scrollbar
- Animações globais (toast, pulse-glow)
- Scroll suave

#### SuccessToast.tsx
- Notificação de sucesso com animação
- Auto-fechamento após 3 segundos

## Arquivos Removidos

Os seguintes arquivos foram removidos por não estarem em uso:
- `src/components/Header.tsx` (substituído pela nova estrutura)
- `src/components/DialogManager.tsx` (não utilizado)
- `src/components/RealtimeStatus.tsx` (não utilizado)

## Benefícios da Nova Estrutura

### Manutenibilidade
- Componentes menores e focados em uma única responsabilidade
- Mais fácil de encontrar e corrigir bugs
- Código autodocumentado com comentários JSDoc

### Escalabilidade
- Fácil adicionar novos componentes de booking
- Estrutura clara para novos desenvolvedores
- Barrel exports facilitam importações

### Performance
- Componentes podem ser lazy-loaded individualmente
- Melhor tree-shaking durante o build

### Testabilidade
- Componentes isolados são mais fáceis de testar
- Mocks mais simples devido à separação de responsabilidades

## Como Usar

### Importando Componentes

```tsx
// Importar o Header
import { Header } from '@/components/layout/header';

// Importar componentes de booking individualmente
import { BookingModal, ServiceSelector } from '@/components/booking';

// Importar componentes compartilhados
import { GlobalStyles, SuccessToast } from '@/components/shared';
```

### Adicionando Novos Componentes de Booking

1. Criar arquivo em `src/components/booking/`
2. Exportar no `index.ts`
3. Importar e usar no `BookingModal.tsx`

### Modificando o Header

- **Navegação Desktop**: editar `DesktopNav.tsx`
- **Navegação Mobile**: editar `MobileNav.tsx`
- **Botões de Ação**: editar `HeaderActions.tsx`
- **Lógica Principal**: editar `Header.tsx`

## Tipos TypeScript

Todos os tipos relacionados a booking estão centralizados em:
```typescript
// src/components/booking/types.ts
export interface Service { ... }
export interface Professional { ... }
export interface Appointment { ... }
```

## Próximos Passos Sugeridos

1. Implementar testes unitários para cada componente
2. Adicionar Storybook para documentação visual
3. Considerar implementar lazy loading para BookingModal
4. Criar mais componentes compartilhados conforme necessário
5. Adicionar error boundaries para componentes críticos

## Convenções de Código

- **Nomes de Arquivo**: PascalCase para componentes (ex: `BookingModal.tsx`)
- **Pastas**: lowercase com hífen (ex: `layout/header`)
- **Exports**: Usar barrel exports (`index.ts`) em cada pasta
- **Comentários**: JSDoc para componentes e funções principais
- **Props**: Interfaces nomeadas como `{ComponentName}Props`

---

**Data da Reestruturação**: Outubro 2024
**Autor**: Claude (Assistente AI)
**Status**: ✅ Concluído e Testado
