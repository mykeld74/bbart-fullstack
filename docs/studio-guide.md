# Studio User Guide

How to update the Brenda Bennett Art website. This is the text version of
[`Brenda-Bennett-Art-Studio-Guide.pdf`](Brenda-Bennett-Art-Studio-Guide.pdf) —
keep the two in step by editing `build-studio-guide.py` and re-running it.

Developer notes live in [`../studio/README.md`](../studio/README.md) instead.

## The basics

- Sign in with the account you were invited with. No invite yet? A developer
  sends one.
- Everything you type saves as a draft straight away. There is no Save button
  and you cannot lose work by closing the tab.
- A draft is not on the website. Click **Publish** at the bottom of the document
  to make it live.
- To take something off the site but keep it, use **Unpublish**. **Delete** is
  permanent.
- To undo, open the **three-dot menu** at the top and choose **Review changes**.

### Where things live

| Sidebar | What it holds |
| ------- | ------------- |
| Artwork | Every piece — paintings, prints, commissions |
| Events | Shows on the Exhibitions page |
| Pages | Biography, Her Studio, Exhibitions, and the menu |
| Footer Links | The social icons at the bottom of every page |
| Series, Image Type, Nav Category | The labels that sort artwork and build the menu |

## Artwork

### Adding a piece

- Choose **Artwork**, then **Create new**.
- **Title** and **Slug** are required. Click **Generate** to make the slug from
  the title, then leave it alone.
- **Price** takes numbers only — the site adds the dollar sign. Turn on **Sold**
  and it shows "Sold" instead.
- A new piece goes to the **top** of the Artwork list, and to the top of its
  gallery pages.
- Drag rows in the Artwork list to move a piece somewhere else. That order is
  used on every gallery page, and it saves as soon as you drop it.

### Which gallery a piece appears on

You don't pick a page. Each gallery collects artwork by matching the name of a
Series or an Image Type.

| Gallery | Collects artwork where |
| ------- | ---------------------- |
| Aspens | Series includes `Aspen` |
| Colorado Flag | Series includes `Colorado Flag` |
| Other Artwork | Series includes `Other` |
| Original Artwork | Image Types includes `Original` |
| Commissions | Image Types includes `Commission` |
| Fine Art Prints | A fixed set of three pieces |

> The names have to match exactly. Always pick an existing Series from the
> dropdown rather than typing a new one, and don't rename a Series — renaming
> `Aspen` empties the Aspens page.

## Events and Pages

### Events

- Fill in the title, date, time, venue, an image and a description.
- The **Multi-day event** switch changes the date fields. Off gives you one
  **Date**; on gives you **Start Date** and **End Date**.
- Past events drop off the Exhibitions page on their own. You never need to
  delete one.

### Pages

- Three pages take their content from here: Biography, Her Studio and
  Exhibitions.
- Don't change the **Slug** on an existing page — it is how the site finds it.
- **Navigation Title** is the menu label, **Order** is its position, and
  **Nav Category** is which menu group it sits under.
- The **Page builder** on Exhibitions stacks four kinds of block: Text, Image
  with caption, Image pair, and Split content. Drag them to reorder.

> Creating a new Page does not create a new web page. It adds a menu item that
> leads to a "not found" error. A genuinely new page needs a developer.

## Images

- Drag and drop onto the field, or click to browse.
- Click the crop icon and set the **hotspot** — the part that must stay visible
  when the site crops the image to fit.
- Fill in **alt text** where the field offers it. Describe the picture rather
  than repeating the title.
- Upload the largest file you have.

### Seeing it before you publish

On Events and Pages there is a **Visual Editor** button above the fields. It
opens the real website beside the form, so you can click something in the
preview to jump to the field that controls it. The preview shows your drafts;
visitors still see the published version.

## When changes appear

Everything goes live as soon as you publish. Artwork and its galleries, events,
pages, the menu and the footer all pick up your change within seconds. There is
no rebuild step and nothing to wait for.

If you published something and still can't see it:

- Check it is actually published. An orange dot on the document means there are
  unpublished changes still sitting in the draft.
- Refresh the page.
- For artwork, check it has the right Series or Image Type — see
  [Which gallery a piece appears on](#which-gallery-a-piece-appears-on).

## Quick fixes

| Symptom | Usual cause |
| ------- | ----------- |
| Artwork published but not on the page | Check you pressed Publish — an orange dot means unpublished changes. Otherwise the piece is missing its Series or Image Type; compare it with one that is on the page. |
| A gallery has gone empty | A Series or Image Type was renamed. Check the spelling. |
| A menu item goes to "not found" | That page has no address on the site. Clear its Nav Category to take it out of the menu. |
| Publish is greyed out | Look for fields marked in red — usually a required field left empty, or an end date before its start date. |
| An event is missing | Its date has passed, or the Multi-day switch doesn't match the dates you filled in. |
| You want a change back | Three-dot menu, then Review changes. |

Anything that needs a code change — a new gallery, a new page, a new kind of
block — is a developer job.
