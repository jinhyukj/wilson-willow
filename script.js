'use strict';
const poemText = `The Tender Hours
by Wilson Willow

Where men must sell their days for bread
And bend beneath another’s will,
The tender hours of love are fled,
And all the heart’s desires lie still.

For love must have its time to bloom,
Its quiet walk, its evening light;
But labour follows to the room
And takes the remnant of the night.

And those who live by others’ toil,
With idle hours enough to spare,
Have learned to count their golden spoil,
But long forgotten how to share.`;
const statusLine = document.getElementById('status');
const canonical = document.querySelector('link[rel="canonical"]').href;
async function copyText(text) {
  if (navigator.clipboard && window.isSecureContext) {
    try { await navigator.clipboard.writeText(text); return; } catch (_) { /* Try local clipboard fallback. */ }
  }
  const field = document.createElement('textarea');
  field.value = text;
  field.style.cssText = 'position:fixed;left:-9999px;top:0';
  document.body.append(field);
  field.select();
  const success = document.execCommand('copy');
  field.remove();
  if (!success) throw new Error('Clipboard unavailable');
}
document.getElementById('copy').addEventListener('click', async () => {
  try { await copyText(poemText); statusLine.textContent = 'Poem copied, with Wilson Willow’s byline.'; }
  catch (_) { statusLine.textContent = 'Please select the poem above to copy it.'; }
});
document.getElementById('share').addEventListener('click', async () => {
  if (navigator.share) {
    try {
      await navigator.share({title:'The Tender Hours — Wilson Willow',text:'For love must have its time to bloom.',url:canonical});
      statusLine.textContent = 'Thank you for sharing the poem.';
      return;
    } catch (error) { if (error.name === 'AbortError') return; }
  }
  try { await copyText(canonical); statusLine.textContent = 'Link copied. Share it wherever you like.'; }
  catch (_) { statusLine.textContent = 'You can share this page using its address in your browser.'; }
});
