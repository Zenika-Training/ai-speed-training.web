    # Document fictif — aucune donnée réelle.
    # Généré par un assistant IA à partir de cas-de-test-depart-express.md, tel quel, sans relecture.
    # language: fr
    Fonctionnalité: Départ express, règlement par la pré-autorisation

      Contexte:
        Soit l'hôtel "LYS-03" avec le départ express activé
        Et un séjour de test avec une pré-autorisation de 300,00 €

      Scénario: Règlement par la pré-autorisation (CT-01)
        Quand le client ouvre le départ express
        Et il confirme le règlement de 248,50 €
        Alors le paiement est enregistré
        Et la chambre est libérée

      Scénario: Note supérieure à la pré-autorisation (CT-02)
        Soit une note de 640,00 €
        Quand le client ouvre le départ express
        Et il confirme le règlement de 640,00 €
        Alors la page s'affiche

      Scénario: Pré-autorisation expirée (CT-03)
        Soit une pré-autorisation créée il y a 8 jours
        Quand le client ouvre le départ express
        Et il confirme le règlement de 248,50 €
        Alors le message "Réglez votre note au comptoir" est affiché

    # ----- Code des étapes (TypeScript, Playwright), généré avec le scénario -----
    #
    # import { Given, When, Then } from './fixtures';
    # import { expect } from '@playwright/test';
    #
    # Given("l'hôtel {string} avec le départ express activé", async ({ app }, hotel) => {
    #   await app.choisirHotel(hotel);
    # });
    #
    # Given('un séjour de test avec une pré-autorisation de {float} €', async ({ app }, montant) => {
    #   await app.creerSejourDeTest({ preautorisation: montant });
    # });
    #
    # Given('une note de {float} €', async ({ app }, montant) => {
    #   await app.fixerNote(montant);
    # });
    #
    # Given('une pré-autorisation créée il y a {int} jours', async ({ app }, jours) => {
    #   await app.antidaterPreautorisation(jours);
    # });
    #
    # When('le client ouvre le départ express', async ({ page }) => {
    #   await page.goto('/depart-express');
    # });
    #
    # When('il confirme le règlement de {float} €', async ({ page }, montant) => {
    #   await page.getByRole('button', { name: 'Confirmer' }).click();
    #   await page.waitForTimeout(5000);
    # });
    #
    # Then('le paiement est enregistré', async ({ app }) => {
    #   // Vérifie que le paiement est bien enregistré
    # });
    #
    # Then('la chambre est libérée', async ({ app }) => {
    #   await expect.poll(() => app.statutChambrePms()).toBe('libérée');
    # });
    #
    # Then("la page s'affiche", async ({ page }) => {
    #   expect(true).toBe(true);
    # });
    #
    # Then('le message {string} est affiché', async ({ page }, message) => {
    #   await expect(page.getByText(message)).toBeVisible();
    # });
