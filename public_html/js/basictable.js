/*
 * @license jQuery Basictable | MIT | Jerry Low | https://www.github.com/jerrylow/basictable
 */
! function (t) {
    t.fn.basictable = function (a) {
        var e = function (a, e) {
                var r = [];
                if (e.tableWrap && a.wrap('<div class="bt-wrapper"></div>'), e.header) {
                    var i = "";
                    i = a.find("thead tr th").length ? "thead th" : a.find("tbody tr th").length ? "tbody tr th" : a.find("th").length ? "tr:first th" : "tr:first td", t.each(a.find(i), function () {
                        var a = t(this),
                            e = parseInt(a.attr("colspan"), 10) || 1,
                            n = a.closest("tr").index();
                        r[n] || (r[n] = []);
                        for (var i = 0; i < e; i++) r[n].push(a)
                    })
                }
                t.each(a.find("tbody tr"), function () {
                    n(t(this), r, e)
                }), t.each(a.find("tfoot tr"), function () {
                    n(t(this), r, e)
                })
            },
            n = function (a, e, n) {
                a.children().each(function () {
                    var a = t(this);
                    if ("" !== a.html() && "&nbsp;" !== a.html() || n.showEmptyCells) {
                        for (var r = a.index(), i = "", o = 0; o < e.length; o++) {
                            0 != o && (i += ": "), i += e[o][r].text()
                        }
                        a.attr("data-th", i), n.contentWrap && !a.children().hasClass("bt-content") && a.wrapInner('<span class="bt-content" />')
                    } else a.addClass("bt-hide")
                })
            },
            r = function (a, e) {
                e.forceResponsive ? null !== e.breakpoint && t(window).width() <= e.breakpoint || null !== e.containerBreakpoint && a.parent().width() <= e.containerBreakpoint ? i(a, e) : o(a, e) : a.removeClass("bt").outerWidth() > a.parent().width() ? i(a, e) : o(a, e)
            },
            i = function (t, a) {
                t.addClass("bt"), a.header || t.addClass("bt--no-header"), a.tableWrap && t.parent(".bt-wrapper").addClass("active")
            },
            o = function (t, a) {
                t.removeClass("bt bt--no-header"), a.tableWrap && t.parent(".bt-wrapper").removeClass("active")
            },
            s = function (a, e) {
                var n;
                a.removeClass("bt bt--no-header"), a.find("td").removeAttr("data-th"), e.tableWrap && a.unwrap(), e.contentWrap && (n = a, t.each(n.find("td"), function () {
                    var a = t(this),
                        e = a.children(".bt-content").html();
                    a.html(e)
                })), a.removeData("basictable")
            };
        this.each(function () {
            var n = t(this);
            if (0 === n.length || n.data("basictable")) {
                if (n.data("basictable")) {
                    var l = n.data("basictable");
                    "destroy" === a ? s(n, l) : "restart" === a ? (s(n, l), n.data("basictable", l), e(n, l), r(n, l)) : "start" === a ? i(n, l) : "stop" === a ? o(n, l) : r(n, l)
                }
                return !1
            }
            var c = t.extend({}, t.fn.basictable.defaults, a),
                d = {
                    breakpoint: c.breakpoint,
                    containerBreakpoint: c.containerBreakpoint,
                    contentWrap: c.contentWrap,
                    forceResponsive: c.forceResponsive,
                    noResize: c.noResize,
                    tableWrap: c.tableWrap,
                    showEmptyCells: c.showEmptyCells,
                    header: c.header
                };
            null === d.breakpoint && null === d.containerBreakpoint && (d.breakpoint = 568), n.data("basictable", d), e(n, n.data("basictable")), d.noResize || (r(n, n.data("basictable")), t(window).bind("resize.basictable", function () {
                var t;
                (t = n).data("basictable") && r(t, t.data("basictable"))
            }))
        })
    }, t.fn.basictable.defaults = {
        breakpoint: null,
        containerBreakpoint: null,
        contentWrap: !0,
        forceResponsive: !0,
        noResize: !1,
        tableWrap: !1,
        showEmptyCells: !1,
        header: !0
    }
}(jQuery);
