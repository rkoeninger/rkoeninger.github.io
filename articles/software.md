# Software List

## Install List for a New Windows Machine

<div class="no-mobile">
    <h3>Chocolatey Install Script</h3>
    <p>It should be possible to drop this into a bat script and run it in a command window with Administrative privileges. It will retrieve some basic tools a .Net developer might want.</p>
    <p>You can omit the first line if you already have [Chocolatey][choco] installed.</p>
    <pre><code class="lang-bat">@powershell -NoProfile -ExecutionPolicy unrestricted -Command "iex ((new-object net.webclient).DownloadString('https://chocolatey.org/install.ps1'))" && SET PATH=%PATH%;%ALLUSERSPROFILE%\chocolatey\bin

choco install git
choco install 7zip
choco install astrogrep
choco install rdcman
choco install gow
choco install winmerge
choco install keepass
choco install qttabbar
choco install cutepdf
choco install foxitreader
choco install sublimetext2
choco install fiddler
choco install hxd
choco install spacesniffer</code></pre></div>

### Full List of Links

#### Web

  * [Chrome](//www.google.com/chrome/browser/)
  * [Fiddler](//www.telerik.com/fiddler)

##### Chrome Plugins

  * [Chameleon](//github.com/ghostwords/chameleon)
  * [Adblock](//chrome.google.com/webstore/detail/adblock/gighmmpiobklfepjocnamgkkbiglidom?hl=en)
  * [Adblock Plus](//chrome.google.com/webstore/detail/adblock-plus/cfhdojbkjhnklbpkdaibdccddilifddb?hl=en)
  * [Stylish](//chrome.google.com/webstore/detail/stylish/fjnbnpbmkenffdnngjfgmeleoegfcffe?hl=en)
  * [Session Buddy](//chrome.google.com/webstore/detail/session-buddy/edacconmaakjimmfgnblocblbcdcpbko?hl=en)
  * [Webpage Spell-Check](//chrome.google.com/webstore/detail/webpage-spell-check/mgdhaoimpabdhmacaclbbjddhngchjik)
  * [TamperMonkey](//chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=en)

#### Operating System Tools

  * [KeePass](//keepass.info/)
  * [QtTabBar](//qttabbar.sourceforge.net/)
  * [7-Zip](//www.7-zip.org/)
  * [Console2](//sourceforge.net/projects/console/)
  * [GOW](//github.com/bmatzelle/gow/wiki)
  * [Sysinternals Suite](//technet.microsoft.com/en-us/sysinternals/bb842062.aspx)
  * [Space Sniffer](//www.uderzo.it/main_products/space_sniffer/)
  * [Chocolatey][choco]

#### Coding

  * [Git](//git-scm.com)
  * [GitHub for Windows](//windows.github.com/)
  * [Sublime Text](//www.sublimetext.com/)
  * [Light Table](//www.lighttable.com/)
  * [HxD Hex Editor](//mh-nexus.de/en/hxd/)
  * [AstroGrep](//astrogrep.sourceforge.net/)
  * [WinMerge](//winmerge.org/)
  * [Leiningen](//leiningen.org/)
  * [Clojure Docs](//clojure.github.io/clojure/clojure.core-api.html)
  * [RedGate SQL Search](//www.red-gate.com/products/sql-development/sql-search/)

#### Multimedia

  * [Foxit Reader](//www.foxitsoftware.com/Secure_PDF_Reader/)
  * [CutePDF](//www.cutepdf.com/)
  * [AnyToISO](//www.crystalidea.com/anytoiso)
  * [PowerISO](//www.poweriso.com/)
  * [VLC Player](//www.videolan.org/vlc/index.html)
  * [foobar200](//www.foobar2000.org/)
  * [Paint.NET](//www.getpaint.net/)
  * [Inkscape](//inkscape.org/en/)

#### Remoting

  * [TeamViewer](//www.teamviewer.com/en/index.aspx)
  * [Remote Desktop Connection Manager](//www.microsoft.com/en-us/download/details.aspx?id=44989)

[choco]: //chocolatey.org/
