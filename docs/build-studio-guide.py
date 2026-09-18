#!/usr/bin/env python
"""
Build the Studio user guide PDF.

Styled to match the website: Special Elite throughout, black on white,
#339966 as the single accent, hairline rules.

    pip install reportlab
    python docs/build-studio-guide.py

Special Elite is the site's Google font. Drop SpecialElite.ttf next to this
script, or let it fall back to Courier.
"""

import os
import re
from reportlab.lib import colors
from reportlab.lib.pagesizes import LETTER
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import inch
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    BaseDocTemplate, Frame, PageTemplate, Paragraph, Spacer, Table, TableStyle,
    PageBreak, KeepTogether, Flowable, NextPageTemplate,
)

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, 'Brenda-Bennett-Art-Studio-Guide.pdf')

# ---------------------------------------------------------------- font

FACE = 'Courier'
for candidate in (os.path.join(HERE, 'SpecialElite.ttf'),
                  os.path.join(HERE, 'fonts', 'SpecialElite.ttf')):
    if os.path.exists(candidate):
        pdfmetrics.registerFont(TTFont('SpecialElite', candidate))
        # One weight only, exactly like the site — emphasis is colour, not bold
        pdfmetrics.registerFontFamily(
            'SpecialElite', normal='SpecialElite', bold='SpecialElite',
            italic='SpecialElite', boldItalic='SpecialElite')
        FACE = 'SpecialElite'
        break

# ---------------------------------------------------------------- palette

BLACK = colors.HexColor('#000000')
GREEN = colors.HexColor('#339966')
GREY = colors.HexColor('#666666')
HAIRLINE = colors.HexColor('#cccccc')
TINT = colors.HexColor('#f4f9f6')

PAGE_W, PAGE_H = LETTER
MARGIN = 1.05 * inch
T_MARGIN = 0.95 * inch
B_MARGIN = 0.95 * inch
CONTENT_W = PAGE_W - 2 * MARGIN

# ---------------------------------------------------------------- styles

def S(name, **kw):
    kw.setdefault('fontName', FACE)
    kw.setdefault('textColor', BLACK)
    return ParagraphStyle(name, **kw)

BODY = S('body', fontSize=9.6, leading=14.2, spaceAfter=9)
H1 = S('h1', fontSize=19, leading=23, spaceAfter=4)
H2 = S('h2', fontSize=12.4, leading=16, spaceBefore=20, spaceAfter=6,
       keepWithNext=1)
BULLET = S('bullet', fontSize=9.6, leading=14.2, spaceAfter=7,
           leftIndent=14, bulletIndent=0)
CELL = S('cell', fontSize=9, leading=13)
LABEL = S('label', fontSize=8, leading=11, textColor=GREEN, spaceAfter=4)

# ---------------------------------------------------------------- markup

def esc(t):
    return t.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')

def fmt(text):
    """**term** and `value` both become green — the font has one weight."""
    out = esc(text)
    out = re.sub(r'`([^`]+)`', r'<font color="#339966">\1</font>', out)
    out = re.sub(r'\*\*([^*]+)\*\*', r'<font color="#339966">\1</font>', out)
    return out.replace('\n', '<br/>')

# ---------------------------------------------------------------- pieces

class Rule(Flowable):
    def __init__(self, width, thickness=0.7, color=HAIRLINE):
        Flowable.__init__(self)
        self.width, self.thickness, self.color = width, thickness, color
    def wrap(self, aw, ah):
        return (self.width, self.thickness)
    def draw(self):
        self.canv.setStrokeColor(self.color)
        self.canv.setLineWidth(self.thickness)
        self.canv.line(0, 0, self.width, 0)

def para(text, style=BODY):
    return Paragraph(fmt(text), style)

def bullets(items):
    return [Paragraph(fmt(i), BULLET, bulletText='—') for i in items]

def note(text):
    t = Table([[Paragraph(fmt(text), S('note', fontSize=9.2, leading=13.6))]],
              colWidths=[CONTENT_W])
    t.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), TINT),
        ('LINEBEFORE', (0, 0), (0, -1), 2, GREEN),
        ('LEFTPADDING', (0, 0), (-1, -1), 12),
        ('RIGHTPADDING', (0, 0), (-1, -1), 12),
        ('TOPPADDING', (0, 0), (-1, -1), 10),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 10),
    ]))
    return KeepTogether([Spacer(1, 2), t, Spacer(1, 12)])

def simple_table(rows, widths):
    data = [[Paragraph(fmt(c), CELL) for c in r] for r in rows]
    t = Table(data, colWidths=widths, hAlign='LEFT')
    t.setStyle(TableStyle([
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('LEFTPADDING', (0, 0), (-1, -1), 0),
        ('RIGHTPADDING', (0, 0), (-1, -1), 10),
        ('TOPPADDING', (0, 0), (-1, -1), 6),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 6),
        ('LINEBELOW', (0, 0), (-1, -2), 0.5, HAIRLINE),
    ]))
    return [Spacer(1, 2), t, Spacer(1, 12)]

# ---------------------------------------------------------------- document

class Guide(BaseDocTemplate):
    def __init__(self, path):
        BaseDocTemplate.__init__(
            self, path, pagesize=LETTER,
            leftMargin=MARGIN, rightMargin=MARGIN,
            topMargin=T_MARGIN, bottomMargin=B_MARGIN,
            title='Brenda Bennett Art - Studio User Guide',
            author='Brenda Bennett Art')
        f = Frame(MARGIN, B_MARGIN, CONTENT_W, PAGE_H - T_MARGIN - B_MARGIN,
                  leftPadding=0, rightPadding=0, topPadding=0, bottomPadding=0)
        self.addPageTemplates([
            PageTemplate(id='cover', frames=[f], onPage=self.cover),
            PageTemplate(id='main', frames=[f], onPageEnd=self.footer),
        ])

    def cover(self, canv, doc):
        canv.saveState()
        canv.setFont(FACE, 9)
        canv.setFillColor(GREEN)
        canv.drawString(MARGIN, PAGE_H - 1.5 * inch, 'BRENDA BENNETT ART')
        canv.setFont(FACE, 30)
        canv.setFillColor(BLACK)
        canv.drawString(MARGIN, PAGE_H - 2.25 * inch, 'Studio User Guide')
        canv.setStrokeColor(GREEN)
        canv.setLineWidth(1.4)
        canv.line(MARGIN, PAGE_H - 2.5 * inch, MARGIN + 1.4 * inch, PAGE_H - 2.5 * inch)
        canv.setFont(FACE, 11)
        canv.setFillColor(BLACK)
        canv.drawString(MARGIN, PAGE_H - 2.95 * inch, 'How to update the website.')
        canv.restoreState()

    def footer(self, canv, doc):
        canv.saveState()
        canv.setStrokeColor(HAIRLINE)
        canv.setLineWidth(0.7)
        canv.line(MARGIN, B_MARGIN - 26, PAGE_W - MARGIN, B_MARGIN - 26)
        canv.setFont(FACE, 7.6)
        canv.setFillColor(GREY)
        canv.drawString(MARGIN, B_MARGIN - 40, 'Brenda Bennett Art')
        canv.drawRightString(PAGE_W - MARGIN, B_MARGIN - 40, str(doc.page - 1))
        canv.restoreState()


story = []

def section(title):
    story.append(PageBreak())
    story.append(Paragraph(esc(title), H1))
    story.append(Spacer(1, 4))
    story.append(Rule(CONTENT_W, 1.4, GREEN))
    story.append(Spacer(1, 16))

def sub(title):
    story.append(Paragraph(esc(title), H2))

def add(*items):
    for i in items:
        story.extend(i if isinstance(i, list) else [i])


# --- cover contents ----------------------------------------------------
story.append(Spacer(1, 3.55 * inch))
story.append(Paragraph('WHAT’S INSIDE', LABEL))
story.append(Rule(CONTENT_W, 0.7))
story.append(Spacer(1, 12))
add(simple_table(
    [['The basics', 'Signing in, drafts, publishing'],
     ['Artwork', 'Adding pieces and getting them onto a gallery page'],
     ['Events and Pages', 'Shows, and the three pages you can edit'],
     ['Images', 'Cropping and alt text'],
     ['When changes appear', 'Everything is live the moment you publish'],
     ['Quick fixes', 'The usual causes when something looks wrong']],
    [1.9 * inch, CONTENT_W - 1.9 * inch]))
story.append(Spacer(1, 18))
story.append(Paragraph('bbart-svelte.netlify.app', S('url', fontSize=9, textColor=GREY)))
story.append(NextPageTemplate('main'))


# --- the basics --------------------------------------------------------
section('The basics')

add(bullets([
    'Sign in with the account you were invited with. No invite yet? A developer '
    'sends one.',
    'Everything you type saves as a draft straight away. There is no Save button '
    'and you cannot lose work by closing the tab.',
    'A draft is not on the website. Click **Publish** at the bottom of the '
    'document to make it live.',
    'To take something off the site but keep it, use **Unpublish**. '
    '**Delete** is permanent.',
    'To undo, open the **three-dot menu** at the top and choose '
    '**Review changes**.',
]))

sub('Where things live')
add(simple_table(
    [['Artwork', 'Every piece — paintings, prints, commissions'],
     ['Events', 'Shows on the Exhibitions page'],
     ['Pages', 'Biography, Her Studio, Exhibitions, and the menu'],
     ['Footer Links', 'The social icons at the bottom of every page'],
     ['Series, Image Type,\nNav Category',
      'The labels that sort artwork and build the menu']],
    [1.75 * inch, CONTENT_W - 1.75 * inch]))


# --- artwork -----------------------------------------------------------
section('Artwork')

sub('Adding a piece')
add(bullets([
    'Choose **Artwork**, then **Create new**.',
    '**Title** and **Slug** are required. Click **Generate** to make the slug '
    'from the title, then leave it alone.',
    '**Price** takes numbers only — the site adds the dollar sign. Turn on '
    '**Sold** and it shows “Sold” instead.',
    'Drag rows in the Artwork list to set the order. That order is used on '
    'every gallery page, and it saves as soon as you drop it.',
]))

sub('Which gallery a piece appears on')
add(para('You don’t pick a page. Each gallery collects artwork by matching the '
         'name of a Series or an Image Type.'),
    simple_table(
        [['Aspens', 'Series includes `Aspen`'],
         ['Colorado Flag', 'Series includes `Colorado Flag`'],
         ['Other Artwork', 'Series includes `Other`'],
         ['Original Artwork', 'Image Types includes `Original`'],
         ['Commissions', 'Image Types includes `Commission`'],
         ['Fine Art Prints', 'A fixed set of three pieces']],
        [1.75 * inch, CONTENT_W - 1.75 * inch]),
    note('The names have to match exactly. Always pick an existing Series from '
         'the dropdown rather than typing a new one, and don’t rename a Series — '
         'renaming `Aspen` empties the Aspens page.'))


# --- events and pages --------------------------------------------------
section('Events and Pages')

sub('Events')
add(bullets([
    'Fill in the title, date, time, venue, an image and a description.',
    'The **Multi-day event** switch changes the date fields. Off gives you one '
    '**Date**; on gives you **Start Date** and **End Date**.',
    'Past events drop off the Exhibitions page on their own. You never need to '
    'delete one.',
]))

sub('Pages')
add(bullets([
    'Three pages take their content from here: Biography, Her Studio and '
    'Exhibitions.',
    'Don’t change the **Slug** on an existing page — it is how the site finds it.',
    '**Navigation Title** is the menu label, **Order** is its position, and '
    '**Nav Category** is which menu group it sits under.',
    'The **Page builder** on Exhibitions stacks four kinds of block: Text, '
    'Image with caption, Image pair, and Split content. Drag them to reorder.',
]))

add(note('Creating a new Page does not create a new web page. It adds a menu '
         'item that leads to a “not found” error. A genuinely new page needs a '
         'developer.'))


# --- images ------------------------------------------------------------
section('Images')

add(bullets([
    'Drag and drop onto the field, or click to browse.',
    'Click the crop icon and set the **hotspot** — the part that must stay '
    'visible when the site crops the image to fit.',
    'Fill in **alt text** where the field offers it. Describe the picture '
    'rather than repeating the title.',
    'Upload the largest file you have.',
]))

sub('Seeing it before you publish')
add(para('On Events and Pages there is a **Visual Editor** button above the '
         'fields. It opens the real website beside the form, so you can click '
         'something in the preview to jump to the field that controls it. The '
         'preview shows your drafts; visitors still see the published version.'))


# --- when changes appear -----------------------------------------------
section('When changes appear')

add(para('Everything goes live as soon as you publish. Artwork and its '
         'galleries, events, pages, the menu and the footer all pick up your '
         'change within seconds. There is no rebuild step and nothing to '
         'wait for.'))

sub('If you can’t see your change')
add(bullets([
    'Check it is actually published. An orange dot on the document means there '
    'are unpublished changes still sitting in the draft.',
    'Refresh the page.',
    'For artwork, check it has the right Series or Image Type.',
]))


# --- quick fixes -------------------------------------------------------
section('Quick fixes')

add(simple_table(
    [['Artwork published but\nnot on the page',
      'Check you pressed Publish — an orange dot means unpublished changes. '
      'Otherwise the piece is missing its Series or Image Type.'],
     ['A gallery has gone empty',
      'A Series or Image Type was renamed. Check the spelling.'],
     ['A menu item goes to\n“not found”',
      'That page has no address on the site. Clear its Nav Category to take it '
      'out of the menu.'],
     ['Publish is greyed out',
      'Look for fields marked in red — usually a required field left empty, or '
      'an end date before its start date.'],
     ['An event is missing',
      'Its date has passed, or the Multi-day switch doesn’t match the dates you '
      'filled in.'],
     ['You want a change back',
      'Three-dot menu, then Review changes.']],
    [1.85 * inch, CONTENT_W - 1.85 * inch]))

add(Spacer(1, 6),
    para('Anything that needs a code change — a new gallery, a new page, a new '
         'kind of block — is a developer job.'))


Guide(OUT).build(story)
print('wrote', OUT)
